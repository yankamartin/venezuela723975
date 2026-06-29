import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import helmet from '@fastify/helmet'
import rateLimit from '@fastify/rate-limit'
import postgres from 'postgres'

const app = Fastify({
  logger: { level: process.env.NODE_ENV === 'production' ? 'warn' : 'info' },
})

// Conexión a PostgreSQL
const sql = postgres(process.env.DATABASE_URL!, {
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
})

await app.register(helmet, { contentSecurityPolicy: false })
await app.register(cors, {
  origin: [
    'https://venezuela723975.com',
    'https://www.venezuela723975.com',
    'http://localhost:3000',
    'http://localhost:3001',
  ],
  credentials: true,
})
await app.register(jwt, { secret: process.env.JWT_SECRET ?? 'dev_secret' })
await app.register(rateLimit, { max: 100, timeWindow: '1 minute' })

// Importar rutas pasando sql como opción
const { default: candleRoutes } = await import('./routes/candles/index.js')
const { default: authRoutes } = await import('./routes/auth/index.js')
const { default: testimoniesRoutes } = await import('./routes/testimonies/index.js')
const { default: locationsRoutes } = await import('./routes/locations/index.js')
const { default: organizationsRoutes } = await import('./routes/organizations/index.js')
const { default: missingRoutes } = await import('./routes/missing/index.js')

await app.register(candleRoutes, { prefix: '/api/v1/candles', sql })
await app.register(authRoutes, { prefix: '/api/v1/auth' })
await app.register(testimoniesRoutes, { prefix: '/api/v1/testimonies' })
await app.register(locationsRoutes, { prefix: '/api/v1/locations' })
await app.register(organizationsRoutes, { prefix: '/api/v1/organizations' })
await app.register(missingRoutes, { prefix: '/api/v1/missing' })

app.get('/health', async () => ({
  status: 'ok',
  version: '0.1.0',
  timestamp: new Date().toISOString(),
}))

app.addHook('onClose', async () => { await sql.end() })

const port = Number(process.env.API_PORT ?? 4000)
try {
  await app.listen({ port, host: '0.0.0.0' })
  console.log(`API Venezuela 723975 corriendo en puerto ${port}`)
} catch (err) {
  app.log.error(err)
  process.exit(1)
}
