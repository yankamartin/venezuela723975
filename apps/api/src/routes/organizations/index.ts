import type { FastifyPluginAsync } from 'fastify'

const organizationsRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', async () => ({ data: [], total: 0, page: 1, limit: 20, hasMore: false }))
}

export default organizationsRoutes
