import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { appRouter } from './routers/app';
import superjson from 'superjson';

export const trpcServer = createTRPCProxyClient<typeof appRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/api/trpc',
      transformer: superjson,
    }),
  ],
});
