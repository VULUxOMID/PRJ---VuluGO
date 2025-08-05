import { serve } from "inngest/next";
import { inngest } from "../../../../ingest/client";
import { functions } from "../../../../ingest/functions";

// Create an API that serves the Inngest functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions,
});
