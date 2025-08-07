'use client';

import { trpc } from '@/trpc/client';
import { useState } from 'react';

export default function PrefetchExample() {
  const [inputValue, setInputValue] = useState('Example Value');
  const invokeMutation = trpc.invoke.useMutation();

  const handleInvoke = () => {
    invokeMutation.mutate({ value: inputValue });
  };

  return (
    <div className="p-4 border rounded-lg bg-purple-50">
      <h2 className="text-lg font-semibold mb-2">Mutation Example</h2>
      <p className="text-sm text-gray-600 mb-2">
        This component demonstrates using tRPC mutations.
      </p>
      
      <div className="space-y-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full p-2 border rounded text-sm"
          placeholder="Enter value..."
        />
        <button
          onClick={handleInvoke}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm"
          disabled={invokeMutation.isPending}
        >
          {invokeMutation.isPending ? 'Invoking...' : 'Invoke'}
        </button>
      </div>
      
      {invokeMutation.isPending && (
        <div className="text-sm text-gray-500">Invoking...</div>
      )}
      
      {invokeMutation.error && (
        <div className="text-sm text-red-500">
          Error: {invokeMutation.error.message}
        </div>
      )}
      
      {invokeMutation.data && (
        <pre className="text-xs bg-white p-2 rounded border">
          {JSON.stringify(invokeMutation.data, null, 2)}
        </pre>
      )}
    </div>
  );
} 