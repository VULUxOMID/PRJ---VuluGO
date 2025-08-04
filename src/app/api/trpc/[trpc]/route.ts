import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@/trpc/routers/app';

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => ({}),
    onError: ({ error }) => {
      console.error('tRPC Error:', error);
    },
    batching: {
      enabled: true,
    },
  });

export { handler as GET, handler as POST };
