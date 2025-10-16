'use client';

import { useState } from 'react';
import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import Footer from '@/components/footer';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <main className="flex-grow">
        <Hero searchTerm={searchTerm} />
      </main>
      <Footer />
    </div>
  );
}
