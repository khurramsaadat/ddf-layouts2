import { Suspense } from 'react';
import Hero from '@/components/hero';
import LayoutsTable from '@/components/layouts-table';

export default function DDFPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
        <Hero />
        <LayoutsTable />
      </Suspense>
    </div>
  );
}
