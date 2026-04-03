const killPort = require('kill-port')

const devPorts = [5000, 5173, 5174]

async function freeDevPorts() {
  for (const port of devPorts) {
    try {
      await killPort(port)
      console.log(`[dev:free-ports] Freed port ${port}`)
    } catch {
      console.log(`[dev:free-ports] Port ${port} already free`)
    }
  }
}

freeDevPorts().catch((error) => {
  console.error('[dev:free-ports] Unexpected error:', error)
  process.exit(1)
})
