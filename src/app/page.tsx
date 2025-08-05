import { caller } from '@/trpc/server';
import ServerComponent from '@/components/ServerComponent';
import ClientComponent from '@/components/ClientComponent';
import HydrationBoundary from '@/components/HydrationBoundary';
import PrefetchExample from '@/components/PrefetchExample';

const Page = async () => {
  const result = await caller.hello({ text: 'Server Page' });
  
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-8">tRPC Examples</h1>
      
      {/* Server Component Example */}
      <ServerComponent />
      
      {/* Client Component Example */}
      <ClientComponent />
      
      {/* Prefetch Example */}
      <PrefetchExample />
      
      {/* Hydration Boundary Example */}
      <HydrationBoundary>
        <div className="p-4 border rounded-lg bg-yellow-50">
          <h2 className="text-lg font-semibold mb-2">Hydration Boundary</h2>
          <p className="text-sm text-gray-600">
            This content is wrapped in a hydration boundary for better SSR/SSG support.
          </p>
        </div>
      </HydrationBoundary>
      
      {/* Direct Server Call */}
      <div className="p-4 border rounded-lg bg-gray-50">
        <h2 className="text-lg font-semibold mb-2">Direct Server Call</h2>
        <p className="text-sm text-gray-600 mb-2">
          This data was fetched directly on the server using tRPC caller.
        </p>
        <pre className="text-xs bg-white p-2 rounded border">
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default Page
