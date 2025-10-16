'use client';

import { useState } from 'react';
import PromosContent from '@/components/promos-content';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function PromosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <main className="flex-grow">
        <PromosContent searchTerm={searchTerm} />
      </main>
      <Footer />
    </div>
  );
}
