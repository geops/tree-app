import { Hono } from 'hono'
import fs from 'fs'
import path from 'path'
import { serve } from '@hono/node-server'

const app = new Hono()
const baseDir = path.join(process.cwd(), 'tiles')

// Serve tiles.txt at root
app.get('/tiles.txt', async (c) => {
  const filePath = path.join(baseDir, 'tiles.txt')
  try {
    const content = await fs.promises.readFile(filePath, 'utf-8')
    c.header('Content-Type', 'text/plain')
    c.header('Cache-Control', 'public, max-age=3600')
    return c.text(content)
  } catch (err) {
    console.error('tiles.txt not found', err)
    return c.text('File not found', 404)
  }
})

// Serve tree tiles (gzipped)
app.get('/tree/:z/:x/:y', async (c) => {
  try {
    const folder = 'tree'
    const z = decodeURIComponent(c.req.param('z'))
    const x = decodeURIComponent(c.req.param('x'))
    const y = decodeURIComponent(c.req.param('y'))

    const filePath = path.join(baseDir, folder, z, x, y)

    await fs.promises.access(filePath)
    const tileBuffer = await fs.promises.readFile(filePath)

    c.header('Content-Type', 'application/x-protobuf')
    c.header('Content-Encoding', 'gzip')
    c.header('Cache-Control', 'public, max-age=31536000, immutable')
    c.header('Access-Control-Allow-Origin', '*')

    return c.body(new Uint8Array(tileBuffer))
  } catch (err) {
    console.error('Tree tile not found:', err)
    return c.text('Tile not found', 404)
  }
})

// Serve fonts tiles (raw, supports spaces and nested folders)
app.get('/fonts/*', async (c) => {
  try {
    // Remove '/fonts/' from path and decode
    const relativePath = decodeURIComponent(c.req.path.replace(/^\/fonts\//, ''))
    const filePath = path.join(baseDir, 'fonts', relativePath)

    await fs.promises.access(filePath)
    const tileBuffer = await fs.promises.readFile(filePath)

    c.header('Content-Type', 'application/x-protobuf')
    c.header('Content-Encoding', 'identity')
    c.header('Cache-Control', 'public, max-age=31536000, immutable')
    c.header('Access-Control-Allow-Origin', '*')

    return c.body(new Uint8Array(tileBuffer))
  } catch (err) {
    console.error('Font tile not found:', err)
    return c.text('Tile not found', 404)
  }
})

// Start local server
serve({
  fetch: app.fetch,
  port: 3000,
})

console.log('Server running at http://localhost:3000')
