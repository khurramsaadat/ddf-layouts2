'use client';

import { useState } from 'react';
import Navbar from '@/components/navbar';
import ElectronicsContent from '@/components/electronics-content';
import Footer from '@/components/footer';

export default function ElectronicsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <main className="flex-grow">
        <ElectronicsContent searchTerm={searchTerm} />
      </main>
      <Footer />
    </div>
  );
}
