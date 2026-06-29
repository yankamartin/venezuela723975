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
  fastify.get('/', async (req, reply) => {
    return { data: [], total: 0, page: 1, limit: 20, hasMore: false }
  })

  fastify.get('/stats', async () => {
    return { totalCandles: 0, totalFlames: 0, approvedCandles: 0 }
  })

  fastify.post('/', async (req, reply) => {
    const body = createCandleSchema.safeParse(req.body)
    if (!body.success) {
      return reply.status(400).send({ error: 'Datos inválidos', details: body.error.flatten() })
    }
    return reply.status(201).send({
      ...body.data,
      id: 'pending',
      isApproved: false,
      isFeatured: false,
      flameCount: 0,
      createdAt: new Date().toISOString(),
      message: 'Tu tributo ha sido recibido y será revisado. Gracias.',
    })
  })

  fastify.post('/:id/flame', async (req, reply) => {
    return { success: true, flameCount: 1, alreadyLit: false }
  })
}

export default candleRoutes
