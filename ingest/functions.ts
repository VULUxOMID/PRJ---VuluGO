import { inngest } from "./client";
import { createAgent, openai } from '@inngest/agent-kit';

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
        model: openai({
          model: 'gpt-4',
          apiKey: process.env.OPENAI_API_KEY
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
