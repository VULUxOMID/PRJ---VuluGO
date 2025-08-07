'use client';

import { trpc } from '@/trpc/client';
import { useState } from 'react';

export default function ClientComponent() {
  const [inputText, setInputText] = useState('Client Component');
  
  const invokeMutation = trpc.invoke.useMutation();

  return (
    <div className="p-4 border rounded-lg bg-green-50">
      <h2 className="text-lg font-semibold mb-2">Client Component</h2>
      <p className="text-sm text-gray-600 mb-2">
        This component runs on the client and uses tRPC hooks.
      </p>
      
      <div className="mb-3 space-y-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full p-2 border rounded text-sm"
          placeholder="Enter text..."
        />
        <button
          onClick={() => invokeMutation.mutate({ value: inputText })}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
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