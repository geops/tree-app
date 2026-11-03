import { serve } from '@hono/node-server'
import { app } from './server.js'

serve({
  fetch: app.fetch,
  port: parseInt(process.env.PORT as string, 10) || 8000,
})

console.log('Server running at http://localhost:8000')
