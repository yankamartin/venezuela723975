import type { FastifyPluginAsync } from 'fastify'
import type { Sql } from 'postgres'
import { z } from 'zod'

const createCandleSchema = z.object({
  victimName: z.string().min(2).max(200),
  victimAge: z.number().int().min(0).max(150).optional(),
  victimLocation: z.string().max(200).optional(),
  message: z.string().max(2000).optional(),
  authorName: z.string().max(120).optional(),
})

const candleRoutes: FastifyPluginAsync<{ sql: Sql }> = async (fastify, opts) => {
  const sql = opts.sql

  fastify.get('/', async (req) => {
    const { page = 1, limit = 20, featured } = req.query as any
    const offset = (Number(page) - 1) * Number(limit)

    const [{ count }] = await sql`
      SELECT COUNT(*)::int as count FROM candles WHERE is_approved = true
    `
    const candles = await sql`
      SELECT id, victim_name, victim_age, victim_location, message,
             photo_url, flame_count, is_featured, created_at
      FROM candles
      WHERE is_approved = true
      ORDER BY created_at DESC
      LIMIT ${Number(limit)} OFFSET ${offset}
    `
    return {
      data: candles.map(c => ({
        id: c.id,
        victimName: c.victim_name,
        victimAge: c.victim_age,
        victimLocation: c.victim_location,
        message: c.message,
        photoUrl: c.photo_url,
        flameCount: c.flame_count,
        isFeatured: c.is_featured,
        createdAt: c.created_at,
      })),
      total: count,
      page: Number(page),
      limit: Number(limit),
      hasMore: offset + Number(limit) < count,
    }
  })

  fastify.get('/stats', async () => {
    const [stats] = await sql`
      SELECT
        COUNT(*) FILTER (WHERE is_approved = true)::int as approved_candles,
        COALESCE(SUM(flame_count), 0)::int as total_flames
      FROM candles
    `
    return {
      totalCandles: stats.approved_candles,
      totalFlames: stats.total_flames,
    }
  })

  fastify.post('/', async (req, reply) => {
    const body = createCandleSchema.safeParse(req.body)
    if (!body.success) {
      return reply.status(400).send({ error: 'Datos inválidos' })
    }
    const ipHash = Buffer.from(req.ip).toString('base64')
    const [candle] = await sql`
      INSERT INTO candles (victim_name, victim_age, victim_location, message, ip_hash, is_approved)
      VALUES (
        ${body.data.victimName},
        ${body.data.victimAge ?? null},
        ${body.data.victimLocation ?? null},
        ${body.data.message ?? null},
        ${ipHash},
        false
      )
      RETURNING id, victim_name, created_at
    `
    return reply.status(201).send({
      id: candle.id,
      victimName: candle.victim_name,
      createdAt: candle.created_at,
      isApproved: false,
      flameCount: 0,
      message: 'Tu tributo ha sido recibido y será revisado antes de publicarse. Gracias por honrar su memoria.',
    })
  })

  fastify.post<{ Params: { id: string } }>('/:id/flame', async (req, reply) => {
    const { id } = req.params
    const ipFingerprint = Buffer.from(req.ip).toString('base64')

    const [candle] = await sql`
      SELECT id, flame_count FROM candles WHERE id = ${id} AND is_approved = true
    `
    if (!candle) return reply.status(404).send({ error: 'Vela no encontrada' })

    const [existing] = await sql`
      SELECT id FROM candle_flames WHERE candle_id = ${id} AND ip_fingerprint = ${ipFingerprint}
    `
    if (existing) {
      return { success: true, flameCount: candle.flame_count, alreadyLit: true }
    }

    await sql`INSERT INTO candle_flames (candle_id, ip_fingerprint) VALUES (${id}, ${ipFingerprint})`

    const [updated] = await sql`SELECT flame_count FROM candles WHERE id = ${id}`
    return { success: true, flameCount: updated.flame_count, alreadyLit: false }
  })
}

export default candleRoutes
