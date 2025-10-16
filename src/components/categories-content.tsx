'use client';

import { useEffect, useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';

interface Category {
  [key: string]: string | number | boolean | null | undefined;
}

type SortDirection = 'ascending' | 'descending';

interface SortConfig {
  key: string | null;
  direction: SortDirection;
}

export default function CategoriesContent() {
  const [data, setData] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'ascending' });
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  const [originalHeaders, setOriginalHeaders] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories data');
        }
        const result = await response.json();
        setData(result);
        if (result.length > 0) {
          const headers = Object.keys(result[0]);
          setOriginalHeaders(headers);
          // Set default visible columns (first 4 columns)
          setVisibleColumns(headers.slice(0, 4));
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const sortedData = [...data].sort((a, b) => {
    if (sortConfig.key === null) return 0;

    const valA = a[sortConfig.key];
    const valB = b[sortConfig.key];

    // Handle numeric sorting
    if (typeof valA === 'number' && typeof valB === 'number') {
      return sortConfig.direction === 'ascending' ? valA - valB : valB - valA;
    }

    // Handle string sorting
    const strA = String(valA || '').toLowerCase();
    const strB = String(valB || '').toLowerCase();
    
    if (strA < strB) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (strA > strB) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key: string) => {
    let direction: SortDirection = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleColumnVisibilityChange = (column: string, isChecked: boolean) => {
    setVisibleColumns((prev) =>
      isChecked ? [...prev, column] : prev.filter((c) => c !== column)
    );
  };

  if (loading) {
    return (
      <section className="container mx-auto py-10 px-4">
        <div className="text-center">Loading categories...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container mx-auto py-10 px-4">
        <div className="text-center text-red-600">
          <h2 className="text-2xl font-bold mb-4">Error Loading Categories</h2>
          <p>{error}</p>
          <p className="mt-4 text-sm text-gray-600">
            Make sure you have added a &quot;Categories&quot; sheet to your layouts.xlsx file and created the API endpoint.
          </p>
        </div>
      </section>
    );
  }

  if (data.length === 0) {
    return (
      <section className="container mx-auto py-10 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No Categories Found</h2>
          <p className="text-gray-600">
            Add a &quot;Categories&quot; sheet to your layouts.xlsx file with category data.
          </p>
        </div>
      </section>
    );
  }

  const displayHeaders = originalHeaders.filter(header => visibleColumns.includes(header));

  return (
    <section className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-10">Layout Categories</h1>
      
      {/* Column Visibility Controls */}
      <h2 className="text-xl font-semibold text-center mb-4">Column Visibility</h2>
      <div className="rounded-lg border p-4 mb-4 flex flex-wrap justify-center gap-4">
        {originalHeaders.map((header) => {
          const isVisible = visibleColumns.includes(header);
          return (
            <div key={header} className="flex items-center space-x-2">
              <Checkbox
                id={`col-${header}`}
                checked={isVisible}
                onCheckedChange={(checked) =>
                  handleColumnVisibilityChange(header, checked as boolean)
                }
              />
              <label
                htmlFor={`col-${header}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {header}
              </label>
            </div>
          );
        })}
      </div>

      <p className="text-center text-sm text-gray-600 mb-4">
        Total Categories: {data.length}
      </p>

      {/* Categories Table */}
      <div className="rounded-lg border overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              {displayHeaders.map((header) => (
                <TableHead
                  key={header}
                  className="text-xs p-2 cursor-pointer hover:bg-gray-50"
                  onClick={() => requestSort(header)}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center">
                      {header}
                      {header === 'Layout Name' && (
                        <span className="text-primary ml-1">▲</span>
                      )}
                    </span>
                    <span className={sortConfig.key === header ? 'text-primary ml-1' : 'text-gray-400 ml-1'}>
                      {sortConfig.key === header ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : '↕'}
                    </span>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((row, rowIndex) => (
              <TableRow key={rowIndex} className="hover:bg-gray-50">
                {displayHeaders.map((header) => (
                  <TableCell key={header} className="text-xs p-2">
                    {typeof row[header] === 'number' && header.toLowerCase().includes('ratio')
                      ? (row[header] as number).toFixed(2)
                      : String(row[header] || '')}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
