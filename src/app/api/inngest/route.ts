import { serve } from 'inngest/next';
import { inngest } from '@/inngest/client';
import { generateCode } from '@/inngest/functions/generate-code';

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [generateCode],
});
