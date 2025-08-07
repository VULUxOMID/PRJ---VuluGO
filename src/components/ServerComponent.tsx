import { caller } from '@/trpc/server';

export default async function ServerComponent() {
  const result = await caller.invoke({ value: 'Server Component' });
  
  return (
    <div className="p-4 border rounded-lg bg-blue-50">
      <h2 className="text-lg font-semibold mb-2">Server Component</h2>
      <p className="text-sm text-gray-600 mb-2">
        This component runs on the server and uses tRPC caller directly.
      </p>
      <pre className="text-xs bg-white p-2 rounded border">
        {JSON.stringify(result, null, 2)}
      </pre>
    </div>
  );
} 