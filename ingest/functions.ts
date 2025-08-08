import { inngest } from "./client";
import { createAgent, anthropic } from '@inngest/agent-kit';

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
      // Create a simple agent with basic configuration
      const agent = createAgent({
        name: 'summarizer',
        system: 'You are an expert summarizer. Summarize the input in exactly 2 words.',
        model: anthropic({
          model: 'claude-3-haiku-20240307',
          apiKey: ANTHROPIC_API_KEY
        })
      });
      
      // Run the agent
      const result = await agent.run(value);
      
      return { result: result.toString() };
    } catch (error) {
      console.error('Agent error:', error);
      // Fallback if agent fails
      return { result: `hello, ${value}` };
    }
  }
);

// Export all functions
export const functions = [helloWorld];
