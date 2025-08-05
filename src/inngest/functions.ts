import { inngest } from "./client";

// Example background function that can be invoked from the frontend
export const helloWorld = inngest.createFunction(
  { id: "hello-world", name: "Hello World" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    
    return {
      message: `Hello ${event.data.name ?? "World"}!`,
      timestamp: new Date().toISOString(),
    };
  }
);

// Alternative helloWorld function that uses email
export const helloWorldEmail = inngest.createFunction(
  { id: "hello-world-email" },
  { event: "test/hello.world.email" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

// Example function for processing user data
export const processUserData = inngest.createFunction(
  { id: "process-user-data", name: "Process User Data" },
  { event: "user/data.process" },
  async ({ event, step }) => {
    // Validate that event.data exists
    if (!event.data) {
      throw new Error("Event data is required but not provided");
    }

    // Validate that required fields exist
    if (!event.data.userId || !event.data.data) {
      throw new Error("Event data must contain userId and data fields");
    }

    const { userId, data } = event.data;
    
    // Simulate some processing
    await step.sleep("processing", "2s");
    
    // Log the processing
    await step.run("log-processing", () => {
      console.log(`Processing data for user ${userId}:`, data);
    });
    
    return {
      userId,
      processed: true,
      processedAt: new Date().toISOString(),
    };
  }
);

// Export all functions
export const functions = [helloWorld, helloWorldEmail, processUserData]; 