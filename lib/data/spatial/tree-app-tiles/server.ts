import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { readFile } from 'fs/promises'
import path from 'path'

const app = new Hono()
const baseDir = path.join(process.cwd(), 'tiles')

// Serve tiles.txt at root
app.get('/tiles.txt', async (c) => {
  try {
    const filePath = path.join(baseDir, 'tiles.txt')
    const content = await readFile(filePath, 'utf-8')
    c.header('Content-Type', 'text/plain')
    c.header('Cache-Control', 'public, max-age=3600')
    return c.text(content)
  } catch (err) {
    console.error('tiles.txt not found', err)
    return c.text('File not found', 404)
  }
})

// Serve vector tiles
app.get('/:folder/:z/:x/:y.pbf', async (c) => {
  try {
    const { folder, z, x } = c.req.param()
    const y = c.req.param()['y.pbf'].replace('.pbf', '')
    const tilePath = path.join(baseDir, folder, z, x, `${y}.pbf`)
    const isTreeTile = folder === 'tree'

    const tileBuffer = await readFile(tilePath)

    c.header('Content-Type', 'application/x-protobuf')
    c.header('Cache-Control', 'public, max-age=31536000, immutable')
    c.header('Access-Control-Allow-Origin', '*')
    c.header('Content-Encoding', isTreeTile ? 'gzip' : 'identity')

    return c.body(new Uint8Array(tileBuffer))
  } catch (err) {
    return c.text('Tile not found', 404)
  }
})

// Start server
serve({
  fetch: app.fetch,
  port: 3000,
})
