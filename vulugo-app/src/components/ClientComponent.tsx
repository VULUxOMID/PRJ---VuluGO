'use client';

import { trpc } from '@/trpc/client';
import { useState } from 'react';

export default function ClientComponent() {
  const [inputText, setInputText] = useState('Client Component');
  
  const { data, isLoading, error } = trpc.hello.useQuery(
    { text: inputText },
    {
      enabled: !!inputText,
    }
  );

  return (
    <div className="p-4 border rounded-lg bg-green-50">
      <h2 className="text-lg font-semibold mb-2">Client Component</h2>
      <p className="text-sm text-gray-600 mb-2">
        This component runs on the client and uses tRPC hooks.
      </p>
      
      <div className="mb-3">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full p-2 border rounded text-sm"
          placeholder="Enter text..."
        />
      </div>
      
      {isLoading && (
        <div className="text-sm text-gray-500">Loading...</div>
      )}
      
      {error && (
        <div className="text-sm text-red-500">
          Error: {error.message}
        </div>
      )}
      
      {data && (
        <pre className="text-xs bg-white p-2 rounded border">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
} 