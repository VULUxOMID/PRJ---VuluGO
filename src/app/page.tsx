'use client';

import ClientComponent from '@/components/ClientComponent';
import PrefetchExample from '@/components/PrefetchExample';
import { InngestTest } from '@/components/InngestTest';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { trpc } from '@/trpc/client';
import { toast } from 'sonner';

const Page = () => {
  const [value, setValue] = useState("");
  const invokeMutation = trpc.invoke.useMutation({
    onSuccess: () => toast.success('Background job started')
  });
  
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-8">tRPC Examples</h1>
      
      {/* Client Component Example */}
      <ClientComponent />
      
      {/* Prefetch Example */}
      <PrefetchExample />
      
      {/* Input and Invoke Test */}
      <div className="p-4 border rounded-lg bg-blue-50">
        <h2 className="text-lg font-semibold mb-2">Input and Invoke Test</h2>
        <div className="space-y-2">
          <Input 
            value={value} 
            onChange={e => setValue(e.target.value)} 
            placeholder="Enter a value..."
          />
          <Button 
            onClick={() => invokeMutation.mutate({ value })}
            disabled={invokeMutation.isPending}
          >
            {invokeMutation.isPending ? 'Invoking...' : 'Invoke Background Job'}
          </Button>
        </div>
      </div>
      
      {/* Inngest Background Jobs Test */}
      <div className="flex justify-center">
        <InngestTest />
      </div>
    </div>
  );
}

export default Page
