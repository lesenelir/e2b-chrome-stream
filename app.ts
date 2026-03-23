import { Sandbox } from 'e2b'

async function main() {
  console.log('Creating sandbox...')
  const sandbox = await Sandbox.create('e2b-chrome-stream-dev', {
    timeoutMs: 2 * 60 * 1000,
  })
  console.log(`Sandbox created: ${sandbox.sandboxId}`)

  const host = sandbox.getHost(8080)
  // vnc
  // console.log(`noVNC URL: https://${host}?autoconnect=true&resize=scale&control_bar=false`)
  // vnc_lite
  // console.log(`noVNC URL: https://${host}?autoconnect=tru&scale=true`)
  console.log(`noVNC URL: https://${host}`)
}

main().catch(console.error)
