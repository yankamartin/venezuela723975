import type { FastifyPluginAsync } from 'fastify'
import type { Sql } from 'postgres'
import { createHash } from 'crypto'

function hashPassword(password: string, secret: string): string {
  return createHash('sha256').update(password + secret).digest('hex')
}

function createSessionToken(secret: string): string {
  return createHash('sha256').update(secret + 'admin_session').digest('hex')
}

function validateSession(cookie: string | undefined, secret: string): boolean {
  if (!cookie) return false
  return cookie === createSessionToken(secret)
}

const adminRoutes: FastifyPluginAsync<{ sql: Sql }> = async (fastify, opts) => {
  const sql = opts.sql
  const SECRET = process.env.JWT_SECRET ?? 'dev_secret'
  const PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH ?? ''
  const SESSION_COOKIE = 'v723975_admin'

  // POST /api/v1/admin/login
  fastify.post('/login', async (req, reply) => {
    const { password } = req.body as { password: string }
    if (!password) return reply.status(400).send({ error: 'Contraseña requerida' })

    const hash = hashPassword(password, SECRET)
    if (hash !== PASSWORD_HASH) {
      await new Promise(r => setTimeout(r, 1000))
      return reply.status(401).send({ error: 'Contraseña incorrecta' })
    }

    const token = createSessionToken(SECRET)
    reply
      .setCookie(SESSION_COOKIE, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 8,
        path: '/',
      })
      .send({ success: true })
  })

  // GET /api/v1/admin/logout
  fastify.get('/logout', async (req, reply) => {
    reply.clearCookie(SESSION_COOKIE, { path: '/' })
    return reply.redirect('/admin')
  })

  // Proteger todas las rutas excepto login/logout
  fastify.addHook('preHandler', async (req, reply) => {
    if (req.url.endsWith('/login') || req.url.endsWith('/logout')) return
    const cookie = (req.cookies as any)?.[SESSION_COOKIE]
    if (!validateSession(cookie, SECRET)) {
      return reply.status(401).send({ error: 'No autorizado' })
    }
  })

  // GET /api/v1/admin/candles/pending
  fastify.get('/candles/pending', async () => {
    const candles = await sql`
      SELECT id, victim_name, victim_age, victim_location, message, created_at
      FROM candles
      WHERE is_approved = false AND rejection_reason IS NULL
      ORDER BY created_at ASC
    `
    const [stats] = await sql`
      SELECT
        COUNT(*) FILTER (WHERE is_approved = false AND rejection_reason IS NULL)::int as pending,
        COUNT(*) FILTER (WHERE is_approved = true)::int as approved,
        COUNT(*) FILTER (WHERE rejection_reason IS NOT NULL)::int as rejected
      FROM candles
    `
    return {
      data: candles.map(c => ({
        id: c.id,
        victimName: c.victim_name,
        victimAge: c.victim_age,
        victimLocation: c.victim_location,
        message: c.message,
        createdAt: c.created_at,
      })),
      stats: { pending: stats.pending, approved: stats.approved, rejected: stats.rejected },
    }
  })

  // POST /api/v1/admin/candles/:id/approve
  fastify.post<{ Params: { id: string } }>('/candles/:id/approve', async (req) => {
    const { id } = req.params
    await sql`UPDATE candles SET is_approved = true, moderated_at = NOW() WHERE id = ${id}`
    return { success: true }
  })

  // POST /api/v1/admin/candles/:id/reject
  fastify.post<{ Params: { id: string } }>('/candles/:id/reject', async (req) => {
    const { id } = req.params
    const { reason } = (req.body as any) ?? {}
    await sql`
      UPDATE candles
      SET rejection_reason = ${reason ?? 'Rechazado por moderación'}, moderated_at = NOW()
      WHERE id = ${id}
    `
    return { success: true }
  })
}

export default adminRoutes
