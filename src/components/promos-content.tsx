'use client';

import { useState, useMemo, useEffect } from 'react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';
import AnimatedCounter from './animated-counter';

interface PromoLayout {
  [key: string]: string | number | boolean | null | undefined;
}

interface PromosContentProps {
  searchTerm?: string;
}

export default function PromosContent({ searchTerm: externalSearchTerm = '' }: PromosContentProps) {
  const [data, setData] = useState<PromoLayout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortColumn, setSortColumn] = useState<string>('Digital Media');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState<string>(externalSearchTerm);

  // Fetch data from API
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/promos');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  // Handle sorting
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Filter and sort data
  const sortedData = useMemo(() => {
    if (!data) return [];
    
    // First filter by search term
    const filtered = [...data].filter(row => {
      if (!searchTerm) return true;
      
      // Search across all fields
      return Object.values(row).some(value => 
        value !== null && 
        value !== undefined && 
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    
    // Then sort the filtered data
    return filtered.sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      
      if (aValue === undefined || aValue === null) return sortDirection === 'asc' ? 1 : -1;
      if (bValue === undefined || bValue === null) return sortDirection === 'asc' ? -1 : 1;
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      const aString = String(aValue).toLowerCase();
      const bString = String(bValue).toLowerCase();
      
      return sortDirection === 'asc'
        ? aString.localeCompare(bString)
        : bString.localeCompare(aString);
    });
  }, [data, sortColumn, sortDirection, searchTerm]);
  
  // Update searchTerm when externalSearchTerm changes
  useEffect(() => {
    setSearchTerm(externalSearchTerm);
  }, [externalSearchTerm]);

  // Get table headers from data
  const headers = useMemo(() => {
    if (!data || data.length === 0) return [];
    return Object.keys(data[0]);
  }, [data]);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  if (!data || data.length === 0) {
    return <div className="text-center py-10">No data available</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Promos</h1>
      
      <div className="mb-4">
        <p className="text-xl font-bold">Total Layouts: <AnimatedCounter end={sortedData.length} className="text-primary" /></p>
      </div>
      
      <div className="overflow-x-auto">
        <Table className="rounded-lg border overflow-hidden shadow-lg">
          <TableHeader>
            <TableRow className="bg-gray-100 [&_th]:text-black [&_th]:font-semibold [&_th]:text-xs [&_th]:p-2">
              {headers.map((header) => (
                <TableHead 
                  key={header}
                  className="cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                  onClick={() => handleSort(header)}
                >
                  <div className="flex items-center">
                    <span>{header}</span>
                    <span className="ml-1">
                      {sortColumn === header ? (
                        sortDirection === 'asc' ? (
                          <ArrowUpIcon className="h-3 w-3 text-primary" />
                        ) : (
                          <ArrowDownIcon className="h-3 w-3 text-primary" />
                        )
                      ) : (
                        <span className="text-gray-400">↕</span>
                      )}
                    </span>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="[&_tr]:h-10 [&_td]:text-xs [&_td]:p-2">
            {sortedData.map((row, rowIndex) => (
              <TableRow key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                {headers.map((header) => (
                  <TableCell key={`${rowIndex}-${header}`}>
                    {row[header] !== undefined && row[header] !== null ? String(row[header]) : ''}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
