import { Sandbox } from 'e2b'

async function main() {
  console.log('Creating sandbox...')
  const sandbox = await Sandbox.create('e2b-chrome-stream-dev')
  console.log(`Sandbox created: ${sandbox.sandboxId}`)

  const result = await sandbox.commands.run('echo "Hello from E2B sandbox!"')
  console.log(`Command output: ${result.stdout}`)

  await sandbox.kill()
  console.log('Sandbox killed. Test passed!')
}

main().catch(console.error)
