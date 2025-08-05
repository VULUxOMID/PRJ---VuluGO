'use client';

import { HydrateClient } from '@/trpc/server-utils';
import { Suspense } from 'react';

interface HydrationBoundaryProps {
  children: React.ReactNode;
}

export default function HydrationBoundary({ children }: HydrationBoundaryProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HydrateClient>
        {children}
      </HydrateClient>
    </Suspense>
  );
} 