import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { inngest } from '../../../ingest/client';

export const appRouter = createTRPCRouter({
  invoke: baseProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input }) => {
      await inngest.send({
        name: 'user.email.submitted',
        data: { email: input.email },
      });
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
