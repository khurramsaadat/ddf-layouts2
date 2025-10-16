'use client';

import { useState } from 'react';
import ExclusivePromosContent from '@/components/exclusive-promos-content';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function ExclusivePromosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <main className="flex-grow">
        <ExclusivePromosContent searchTerm={searchTerm} />
      </main>
      <Footer />
    </div>
  );
}
