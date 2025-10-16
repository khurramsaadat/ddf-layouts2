'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavbarProps {
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
}

export default function Navbar({ searchTerm = '', onSearchChange }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const pathname = usePathname();

  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTerm = e.target.value;
    setLocalSearchTerm(newTerm);
    // Immediately update the search term for real-time filtering
    if (onSearchChange) {
      onSearchChange(newTerm);
    }
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg border-b border-gray-700">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="flex justify-between items-center md:flex-1">
            {/* Left side - Logo and Search */}
            <div className="flex items-center space-x-4">
              <Link 
                href="/" 
                className="text-xl font-bold text-primary hover:text-primary/80 transition-colors duration-300 tracking-wide"
              >
                LAYOUTS
              </Link>
              
              {/* Search Bar - Desktop */}
              {onSearchChange && (
                <div className="hidden md:block w-64">
                  <input
                    type="text"
                    placeholder="Search by layout name..."
                    value={localSearchTerm}
                    onChange={handleSearchChange}
                    className="w-full px-3 py-1 text-sm border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                </div>
              )}
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-primary transition-colors duration-300 p-2 rounded-md hover:bg-gray-800"
              >
                <svg className="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                    className="transition-all duration-300"
                  />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Desktop Menu - Right side */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              href="/ddf" 
              className={`text-sm px-3 py-2 rounded-md ${pathname === '/ddf' ? 'text-primary bg-gray-800' : 'text-gray-300'} hover:text-primary hover:bg-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105`}
            >
              DDF
            </Link>
            <Link 
              href="/promos" 
              className={`text-sm px-3 py-2 rounded-md ${pathname === '/promos' ? 'text-primary bg-gray-800' : 'text-gray-300'} hover:text-primary hover:bg-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105`}
            >
              Promos
            </Link>
            <Link 
              href="/exclusive-promos" 
              className={`text-sm px-3 py-2 rounded-md ${pathname === '/exclusive-promos' ? 'text-primary bg-gray-800' : 'text-gray-300'} hover:text-primary hover:bg-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105`}
            >
              Exclusive Promos
            </Link>
            <Link 
              href="/electronics" 
              className={`text-sm px-3 py-2 rounded-md ${pathname === '/electronics' ? 'text-primary bg-gray-800' : 'text-gray-300'} hover:text-primary hover:bg-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105`}
            >
              Electronic
            </Link>
            <Link 
              href="/jcd" 
              className={`text-sm px-3 py-2 rounded-md ${pathname === '/jcd' ? 'text-primary bg-gray-800' : 'text-gray-300'} hover:text-primary hover:bg-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105`}
            >
              JCD
            </Link>
            
            {/* More Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className={`text-sm px-3 py-2 rounded-md ${pathname === '/categories' || pathname === '/vendor-list' ? 'text-primary bg-gray-800' : 'text-gray-300'} hover:text-primary hover:bg-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center gap-1`}>
                More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-800 border-gray-700">
                <DropdownMenuItem asChild>
                  <Link 
                    href="/categories" 
                    className={`w-full px-3 py-2 text-sm ${pathname === '/categories' ? 'text-primary' : 'text-gray-300'} hover:text-primary hover:bg-gray-700 transition-colors cursor-pointer`}
                  >
                    Categories
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link 
                    href="/vendor-list" 
                    className={`w-full px-3 py-2 text-sm ${pathname === '/vendor-list' ? 'text-primary' : 'text-gray-300'} hover:text-primary hover:bg-gray-700 transition-colors cursor-pointer`}
                  >
                    Vendor List
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link 
              href="/about" 
              className={`text-sm px-3 py-2 rounded-md ${pathname === '/about' ? 'text-primary bg-gray-800' : 'text-gray-300'} hover:text-primary hover:bg-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105`}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={`text-sm px-3 py-2 rounded-md ${pathname === '/contact' ? 'text-primary bg-gray-800' : 'text-gray-300'} hover:text-primary hover:bg-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105`}
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="space-y-1 pb-3 border-t border-gray-700 pt-3">
            <Link 
              href="/ddf" 
              className={`block px-3 py-2 rounded-md text-sm ${pathname === '/ddf' ? 'text-primary bg-gray-800' : 'text-gray-300'} hover:text-primary hover:bg-gray-800 transition-all duration-300 transform hover:translate-x-2`}
              onClick={() => setIsOpen(false)}
            >
              DDF
            </Link>
            <Link 
              href="/promos" 
              className={`block px-3 py-2 rounded-md text-sm ${pathname === '/promos' ? 'text-primary bg-gray-800' : 'text-gray-300'} hover:text-primary hover:bg-gray-800 transition-all duration-300 transform hover:translate-x-2`}
              onClick={() => setIsOpen(false)}
            >
              Promos
            </Link>
            <Link 
              href="/exclusive-promos" 
              className={`block px-3 py-2 rounded-md text-sm ${pathname === '/exclusive-promos' ? 'text-primary bg-gray-800' : 'text-gray-300'} hover:text-primary hover:bg-gray-800 transition-all duration-300 transform hover:translate-x-2`}
              onClick={() => setIsOpen(false)}
            >
              Exclusive Promos
            </Link>
            <Link 
              href="/electronics" 
              className={`block px-3 py-2 rounded-md text-sm ${pathname === '/electronics' ? 'text-primary bg-gray-800' : 'text-gray-300'} hover:text-primary hover:bg-gray-800 transition-all duration-300 transform hover:translate-x-2`}
              onClick={() => setIsOpen(false)}
            >
              Electronic
            </Link>
            <Link 
              href="/jcd" 
              className={`block px-3 py-2 rounded-md text-sm ${pathname === '/jcd' ? 'text-primary bg-gray-800' : 'text-gray-300'} hover:text-primary hover:bg-gray-800 transition-all duration-300 transform hover:translate-x-2`}
              onClick={() => setIsOpen(false)}
            >
              JCD
            </Link>
            <Link 
              href="/categories" 
              className={`block px-3 py-2 rounded-md text-sm ${pathname === '/categories' ? 'text-primary bg-gray-800' : 'text-gray-300'} hover:text-primary hover:bg-gray-800 transition-all duration-300 transform hover:translate-x-2`}
              onClick={() => setIsOpen(false)}
            >
              Categories
            </Link>
            <Link 
              href="/vendor-list" 
              className={`block px-3 py-2 rounded-md text-sm ${pathname === '/vendor-list' ? 'text-primary bg-gray-800' : 'text-gray-300'} hover:text-primary hover:bg-gray-800 transition-all duration-300 transform hover:translate-x-2`}
              onClick={() => setIsOpen(false)}
            >
              Vendor List
            </Link>
            <Link 
              href="/about" 
              className={`block px-3 py-2 rounded-md text-sm ${pathname === '/about' ? 'text-primary bg-gray-800' : 'text-gray-300'} hover:text-primary hover:bg-gray-800 transition-all duration-300 transform hover:translate-x-2`}
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={`block px-3 py-2 rounded-md text-sm ${pathname === '/contact' ? 'text-primary bg-gray-800' : 'text-gray-300'} hover:text-primary hover:bg-gray-800 transition-all duration-300 transform hover:translate-x-2`}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            
            {/* Search in mobile menu */}
            {onSearchChange && (
              <div className="px-3 py-2">
                <input
                  type="text"
                  placeholder="Search by layout name..."
                  value={localSearchTerm}
                  onChange={handleSearchChange}
                  className="w-full px-3 py-1 text-sm border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-1 focus:ring-primary focus:border-primary"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}