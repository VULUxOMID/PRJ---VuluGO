import { z } from 'zod';
import { publicProcedure, router } from '../init';
import { aiRouter } from './ai';

export const appRouter = router({
  hello: publicProcedure
    .input(z.object({ name: z.string().optional() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.name ?? 'world'}!`,
      };
    }),
  ai: aiRouter,
});

export type AppRouter = typeof appRouter;
