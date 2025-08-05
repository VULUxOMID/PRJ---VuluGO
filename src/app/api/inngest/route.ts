import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { functions } from "@/inngest/functions";

// Create and export the Inngest handler
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions,
}); 