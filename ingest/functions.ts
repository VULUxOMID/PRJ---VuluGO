import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "helloWorld" },
  async ({ event, step }) => {
    const { value } = event.data;
    await step.sleep("wait-a-moment", "5s");
    return { result: value };
  }
);

// Export all functions
export const functions = [helloWorld];
