import { z } from 'zod';
import { publicProcedure, router } from '../init';
import { aiRouter } from './ai';

export const appRouter = router({
  hello: publicProcedure
    .query(() => {
      return {
        greeting: 'Hello Vibe AI Builder!',
      };
    }),
  ai: aiRouter,
});

export type AppRouter = typeof appRouter;
