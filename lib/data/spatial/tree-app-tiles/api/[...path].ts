import { Hono } from 'hono'
import fs from 'fs'
import path from 'path'

const app = new Hono()

app.get('/:folder/:z/:x/:y', (c) => {
  const folder = c.req.param('folder')
  const z = c.req.param('z')
  const x = c.req.param('x')
  const y = c.req.param('y')
  const filePath = path.join(process.cwd(), 'tiles', folder, z, x, `${y}`)

  if (!fs.existsSync(filePath)) {
    return c.text('Tile not found', 404)
  }

  if (folder === 'tree') {
    c.header('Content-Type', 'application/x-protobuf')
    c.header('Content-Encoding', 'gzip')
  } else if (folder === 'fonts') {
    c.header('Content-Type', 'application/x-protobuf')
  }

  c.header('Cache-Control', 'public, max-age=31536000, immutable')
  c.header('Access-Control-Allow-Origin', '*')

  return new Response(new Uint8Array(fs.readFileSync(filePath)), {
    headers: {
      "Content-Type": "application/x-protobuf",
      "Cache-Control": "public, max-age=31536000, immutable",
      "Access-Control-Allow-Origin": "*",
    },
  });
})

export default app