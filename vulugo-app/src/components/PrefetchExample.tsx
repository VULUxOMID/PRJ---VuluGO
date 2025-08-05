'use client';

import { trpc } from '@/trpc/client';
import { useEffect } from 'react';

export default function PrefetchExample() {
  const utils = trpc.useUtils();
  
  // Prefetch data on component mount
  useEffect(() => {
    utils.hello.prefetch({ text: 'Prefetched Data' });
  }, [utils]);

  const { data, isLoading } = trpc.hello.useQuery(
    { text: 'Prefetched Data' },
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  const handlePrefetch = () => {
    utils.hello.prefetch({ text: 'Manual Prefetch' });
  };

  return (
    <div className="p-4 border rounded-lg bg-purple-50">
      <h2 className="text-lg font-semibold mb-2">Prefetch Example</h2>
      <p className="text-sm text-gray-600 mb-2">
        This component demonstrates prefetching data with tRPC.
      </p>
      
      <button
        onClick={handlePrefetch}
        className="mb-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm"
      >
        Prefetch &quot;Manual Prefetch&quot;
      </button>
      
      {isLoading && (
        <div className="text-sm text-gray-500">Loading...</div>
      )}
      
      {data && (
        <pre className="text-xs bg-white p-2 rounded border">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
} 