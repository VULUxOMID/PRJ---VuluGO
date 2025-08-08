import { Sandbox } from '@e2b/code-interpreter'

export async function getSandbox(id: string) {
  return Sandbox.connect(id)
}


