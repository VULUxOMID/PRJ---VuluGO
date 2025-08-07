import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { ingestClient } from '../../../ingest/client';

export const appRouter = createTRPCRouter({
  invoke: baseProcedure
    .input(z.object({ value: z.string() }))
    .mutation(async ({ input }) => {
      await ingestClient.send({
        name: 'helloWorld',
        data: { value: input.value },
      });
      return { success: true };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
