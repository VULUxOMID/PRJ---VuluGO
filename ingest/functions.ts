import { inngest } from "./client";
import { createAgent, anthropic } from '@inngest/agent-kit';
import { Sandbox } from '@e2b/code-interpreter'
import { getSandbox } from '../src/ingest/utils'

// Validate required environment variables at module load to fail fast and log once
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
if (!ANTHROPIC_API_KEY || ANTHROPIC_API_KEY.trim().length === 0) {
  const errorMessage = "Missing required environment variable ANTHROPIC_API_KEY. Please set it to a valid key before starting the service.";
  // Log a clear message to aid debugging and halt execution immediately
  // Throwing here ensures the failure is immediate and not repeated per invocation
  // eslint-disable-next-line no-console
  console.error(errorMessage);
  throw new Error(errorMessage);
}

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "helloWorld" },
  async ({ event, step }) => {
    const { value } = event.data;
    
    // Sleep for 5 seconds
    await step.sleep("wait-a-moment", "5s");
    
    try {
      // Create sandbox and get its id
      const sandboxId = await step.run('get-sandbox-id', async () => {
        const templateName = 'vibe-nextjs-test-2'
        const sbx = await Sandbox.create(templateName)
        // best-effort: set a 60s timeout if available in this SDK version
        const setTimeoutFn = (sbx as any).setTimeout as undefined | ((ms: number) => void)
        if (typeof setTimeoutFn === 'function') setTimeoutFn(60_000)
        const id = (sbx as any).id ?? (sbx as any).sandboxId
        return id
      })

      // Create a simple agent with basic configuration
      const agent = createAgent({
        name: 'summarizer',
        system: 'You are an expert summarizer. Summarize the input in exactly 2 words.',
        model: anthropic({
          model: 'claude-3-haiku-20240307',
          apiKey: ANTHROPIC_API_KEY,
          defaultParameters: { max_tokens: 128 }
        })
      });
      
      // Run the agent
      const result = await agent.run(value);
      // Connect to sandbox and build URL via step for observability
      const sandboxUrl = await step.run('getSandboxUrl', async () => {
        const sbx = await getSandbox(typeof sandboxId === 'string' ? sandboxId : sandboxId?.id)
        const getHostFn = (sbx as any).getHost as undefined | ((port?: number) => string)
        const host = typeof getHostFn === 'function' ? getHostFn(3000) : ((sbx as any).host || (sbx as any).hostname)
        return host ? `https://${host}` : undefined
      })

      return { result: result.toString(), sandboxUrl };
    } catch (error) {
      console.error('Agent error:', error);
      // Fallback if agent fails
      return { result: `hello, ${value}` };
    }
  }
);

// Export all functions
export const functions = [helloWorld];
