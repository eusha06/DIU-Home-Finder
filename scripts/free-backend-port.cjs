const killPort = require('kill-port')

const backendPort = Number(process.env.PORT || 5000)

async function freeBackendPort() {
  try {
    await killPort(backendPort)
    console.log(`[backend:free-port] Freed port ${backendPort}`)
  } catch (error) {
    const message = String(error?.message || '')
    if (/No process running on port/i.test(message)) {
      console.log(`[backend:free-port] Port ${backendPort} already free`)
      return
    }

    throw error
  }
}

freeBackendPort().catch((error) => {
  console.error('[backend:free-port] Unexpected error:', error)
  process.exit(1)
})
