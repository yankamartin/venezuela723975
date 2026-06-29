import type { FastifyPluginAsync } from 'fastify'
import { z } from 'zod'

const createCandleSchema = z.object({
  victimName: z.string().min(2).max(200),
  victimAge: z.number().int().min(0).max(150).optional(),
  victimLocation: z.string().max(200).optional(),
  message: z.string().max(2000).optional(),
  authorName: z.string().max(120).optional(),
})

const candleRoutes: FastifyPluginAsync = async (fastify) => {

  // GET /api/v1/candles — listar velas aprobadas
  fastify.get('/', async (req, reply) => {
    const { page = 1, limit = 20, featured } = req.query as any
    const offset = (Number(page) - 1) * Number(limit)

    const db = fastify.db

    const [{ count }] = await db`
      SELECT COUNT(*)::int as count FROM candles WHERE is_approved = true
    `

    const candles = await db`
      SELECT
        id,
        victim_name,
        victim_age,
        victim_location,
        message,
        photo_url,
        flame_count,
        is_featured,
        created_at
      FROM candles
      WHERE is_approved = true
      ${featured ? db`AND is_featured = true` : db``}
      ORDER BY
        ${featured ? db`flame_count DESC` : db`created_at DESC`}
      LIMIT ${Number(limit)}
      OFFSET ${offset}
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

  // GET /api/v1/candles/stats
  fastify.get('/stats', async () => {
    const db = fastify.db
    const [stats] = await db`
      SELECT
        COUNT(*)::int as total_candles,
        COALESCE(SUM(flame_count), 0)::int as total_flames,
        COUNT(*) FILTER (WHERE is_approved = true)::int as approved_candles
      FROM candles
    `
    return {
      totalCandles: stats.approved_candles,
      totalFlames: stats.total_flames,
    }
  })

  // POST /api/v1/candles — crear vela
  fastify.post('/', async (req, reply) => {
    const body = createCandleSchema.safeParse(req.body)
    if (!body.success) {
      return reply.status(400).send({ error: 'Datos inválidos', details: body.error.flatten() })
    }

    const db = fastify.db
    const ip = req.ip
    const ipHash = Buffer.from(ip).toString('base64')

    const [candle] = await db`
      INSERT INTO candles (
        victim_name,
        victim_age,
        victim_location,
        message,
        ip_hash,
        is_approved
      ) VALUES (
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

  // POST /api/v1/candles/:id/flame — encender vela
  fastify.post<{ Params: { id: string } }>('/:id/flame', async (req, reply) => {
    const { id } = req.params
    const ip = req.ip
    const ipFingerprint = Buffer.from(ip).toString('base64')
    const db = fastify.db

    // Verificar que la vela existe y está aprobada
    const [candle] = await db`
      SELECT id, flame_count FROM candles
      WHERE id = ${id} AND is_approved = true
    `
    if (!candle) {
      return reply.status(404).send({ error: 'Vela no encontrada' })
    }

    // Verificar si ya encendió esta vela
    const [existing] = await db`
      SELECT id FROM candle_flames
      WHERE candle_id = ${id} AND ip_fingerprint = ${ipFingerprint}
    `
    if (existing) {
      return { success: true, flameCount: candle.flame_count, alreadyLit: true }
    }

    // Insertar llama — el trigger actualiza flame_count automáticamente
    await db`
      INSERT INTO candle_flames (candle_id, ip_fingerprint)
      VALUES (${id}, ${ipFingerprint})
    `

    const [updated] = await db`
      SELECT flame_count FROM candles WHERE id = ${id}
    `

    return { success: true, flameCount: updated.flame_count, alreadyLit: false }
  })
}

export default candleRoutes
