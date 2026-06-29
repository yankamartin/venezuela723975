import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import helmet from '@fastify/helmet'
import rateLimit from '@fastify/rate-limit'
import dbPlugin from './plugins/db.js'
import candleRoutes from './routes/candles/index.js'
import authRoutes from './routes/auth/index.js'
import testimoniesRoutes from './routes/testimonies/index.js'
import locationsRoutes from './routes/locations/index.js'
import organizationsRoutes from './routes/organizations/index.js'
import missingRoutes from './routes/missing/index.js'

const app = Fastify({
  logger: {
    level: process.env.NODE_ENV === 'production' ? 'warn' : 'info',
  },
})

await app.register(helmet, { contentSecurityPolicy: false })
await app.register(cors, {
  origin: [
    'https://venezuela723975.com',
    'https://www.venezuela723975.com',
    ...(process.env.NODE_ENV !== 'production' ? ['http://localhost:3000'] : []),
  ],
  credentials: true,
})
await app.register(jwt, {
  secret: process.env.JWT_SECRET ?? 'dev_secret',
})
await app.register(rateLimit, {
  max: 100,
  timeWindow: '1 minute',
})

// Base de datos — primero que todo
await app.register(dbPlugin)

// Rutas
await app.register(authRoutes, { prefix: '/api/v1/auth' })
await app.register(candleRoutes, { prefix: '/api/v1/candles' })
await app.register(testimoniesRoutes, { prefix: '/api/v1/testimonies' })
await app.register(locationsRoutes, { prefix: '/api/v1/locations' })
await app.register(organizationsRoutes, { prefix: '/api/v1/organizations' })
await app.register(missingRoutes, { prefix: '/api/v1/missing' })

app.get('/health', async () => ({
  status: 'ok',
  version: '0.1.0',
  timestamp: new Date().toISOString(),
}))

const port = Number(process.env.API_PORT ?? 4000)
try {
  await app.listen({ port, host: '0.0.0.0' })
  console.log(`API Venezuela 723975 corriendo en puerto ${port}`)
} catch (err) {
  app.log.error(err)
  process.exit(1)
}
