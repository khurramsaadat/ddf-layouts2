'use client';

import LayoutsTable from './layouts-table';
import { useEffect, useState, useMemo } from 'react';
import { Table, TableHeader, TableRow, TableHead } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import AnimatedCounter from './animated-counter';

interface Layout {
  [key: string]: string | number | boolean | null | undefined;
}

type SortDirection = 'ascending' | 'descending';

interface SortConfig {
  key: string | null;
  direction: SortDirection;
}

interface HeroProps {
  searchTerm: string;
}

export default function Hero({ searchTerm }: HeroProps) {
  const [data, setData] = useState<Layout[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'Layout Name', direction: 'ascending' });
  const [visibleColumns, setVisibleColumns] = useState<string[]>(['Layout Name', 'Width', 'Height', 'Canvas width', 'Canvas height']);
  const [originalHeaders, setOriginalHeaders] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/layouts');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
        if (result.length > 0) {
          const headers = Object.keys(result[0]);
          setOriginalHeaders(headers);
          // Default visible columns are set in useState, no need to set here
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    }

    fetchData();
  }, []);

  const sortedData = useMemo(() => {
    // First filter by search term
    let filteredItems = [...data];
    
    if (searchTerm.trim() !== '') {
      filteredItems = filteredItems.filter(item => {
        const layoutName = String(item['Layout'] || '').toLowerCase();
        return layoutName.includes(searchTerm.toLowerCase());
      });
    }
    
    // Then sort the filtered items
    if (sortConfig.key !== null) {
      const numericColumns = ['Width', 'Height', 'Canvas Width', 'Canvas Height', 'Ratio'];
      const isNumericSort = numericColumns.includes(sortConfig.key);

      filteredItems.sort((a, b) => {
        const valA = a[sortConfig.key === 'Layout Name' ? 'Layout' : sortConfig.key!];
        const valB = b[sortConfig.key === 'Layout Name' ? 'Layout' : sortConfig.key!];

        if (isNumericSort) {
          if (Number(valA) < Number(valB)) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (Number(valA) > Number(valB)) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
        } else {
          if (String(valA).toLowerCase() < String(valB).toLowerCase()) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (String(valA).toLowerCase() > String(valB).toLowerCase()) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
        }
        return 0;
      });
    }
    return filteredItems;
  }, [data, sortConfig, searchTerm]);

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

  if (error) {
    return <section className="container mx-auto py-10 px-4"><div>Error: {error}</div></section>;
  }

  if (data.length === 0) {
    return <section className="container mx-auto py-10 px-4"><div>Loading...</div></section>;
  }

  const displayHeaders = originalHeaders.map(header => header === 'Layout' ? 'Layout Name' : header).filter(header => visibleColumns.includes(header));

  const half = Math.ceil(sortedData.length / 2);
  const firstHalfData = sortedData.slice(0, half);
  const secondHalfData = sortedData.slice(half);

  return (
    <section className="container mx-auto py-6 px-4">
      <h1 className="text-4xl font-bold text-center mb-6">DDF Layouts</h1>
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <p className="text-xl font-bold mb-2 md:mb-0">
          {searchTerm ? (
            <>Showing <AnimatedCounter end={sortedData.length} className="text-primary" /> of <AnimatedCounter end={data.length} className="text-primary" /> layouts</>
          ) : (
            <>Total Layouts: <AnimatedCounter end={data.length} className="text-primary" /></>
          )}
        </p>
        
        <div className="flex flex-wrap items-center gap-2 justify-end">
          <span className="text-sm font-medium">Column Visibility:</span>
          {originalHeaders.map((header) => {
            const displayHeader = header === 'Layout' ? 'Layout Name' : header;
            const isVisible = visibleColumns.includes(displayHeader);
            return (
              <div key={header} className="flex items-center space-x-1">
                <Checkbox
                  id={`col-${header}`}
                  checked={isVisible}
                  onCheckedChange={(checked) =>
                    handleColumnVisibilityChange(displayHeader, checked as boolean)
                  }
                />
                <label
                  htmlFor={`col-${header}`}
                  className="text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {displayHeader}
                </label>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg border overflow-x-auto">
          <Table className="table-fixed w-full">
            <TableHeader>
              <TableRow>
                {displayHeaders.map((header) => (
                  <TableHead
                    key={header}
                    className={`text-xs p-2 cursor-pointer ${header === 'Layout Name' ? 'w-2/6' : 'w-1/6'}`}
                    onClick={() => requestSort(header)}
                  >
                    <span className="flex items-center">
                      {header}
                      {header === 'Layout Name' && (
                        <span className="text-primary ml-1">▲</span>
                      )}
                    </span>
                    <span className={sortConfig.key === header ? 'text-primary ml-1' : 'text-gray-400 ml-1'}>
                      {sortConfig.key === header ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : '↕'}
                    </span>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <LayoutsTable
              data={firstHalfData}
              visibleColumns={visibleColumns}
              originalHeaders={originalHeaders}
            />
          </Table>
        </div>
        <div className="rounded-lg border overflow-x-auto">
          <Table className="table-fixed w-full">
            <TableHeader>
              <TableRow>
                {displayHeaders.map((header) => (
                  <TableHead
                    key={header}
                    className={`text-xs p-2 cursor-pointer ${header === 'Layout Name' ? 'w-2/6' : 'w-1/6'}`}
                    onClick={() => requestSort(header)}
                  >
                    <span className="flex items-center">
                      {header}
                      {header === 'Layout Name' && (
                        <span className="text-primary ml-1">▲</span>
                      )}
                    </span>
                    <span className={sortConfig.key === header ? 'text-primary ml-1' : 'text-gray-400 ml-1'}>
                      {sortConfig.key === header ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : '↕'}
                    </span>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <LayoutsTable
              data={secondHalfData}
              visibleColumns={visibleColumns}
              originalHeaders={originalHeaders}
            />
          </Table>
        </div>
      </div>
    </section>
  );
}
