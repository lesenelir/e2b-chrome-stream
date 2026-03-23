import { Sandbox } from 'e2b'

async function main() {
  console.log('Creating sandbox...')
  const sandbox = await Sandbox.create('e2b-chrome-stream-dev', {
    timeoutMs: 2* 60 * 1000, // 2 minutes
  })
  console.log(`Sandbox created: ${sandbox.sandboxId}`)

  const host = sandbox.getHost(8080)
  // console.log(`noVNC URL: https://${host}?autoconnect=true&resize=scale&control_bar=false`)

  // vnc_lite
  console.log(`noVNC URL: https://${host}?autoconnect=tru&scale=true`)
}

main().catch(console.error)
