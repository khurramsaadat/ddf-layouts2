'use client';

import { useState, useMemo, useEffect } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import AnimatedCounter from './animated-counter';

interface JCDLayout {
  [key: string]: string | number | boolean | null | undefined;
}

type SortDirection = 'ascending' | 'descending';

interface SortConfig {
  key: string | null;
  direction: SortDirection;
}

export default function JCDContent() {
  const [data, setData] = useState<JCDLayout[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'ascending' });
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  const [originalHeaders, setOriginalHeaders] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/jcd');
        if (!response.ok) {
          throw new Error('Failed to fetch JCD data');
        }
        const result = await response.json();
        
        // Process data to separate dimensions into Width and Height
        const processedData = result.map((row: JCDLayout) => {
          const processedRow = { ...row };
          
          // Look for dimension columns - check both column names and values
          Object.keys(row).forEach(key => {
            const value = String(row[key] || '');
            const keyLower = key.toLowerCase();
            
            // Check if this is a dimension column by name or content
            const isDimensionColumn = 
              (keyLower.includes('width') && keyLower.includes('height')) ||
              keyLower.includes('dimension') ||
              keyLower === 'size' ||
              /(\d+)\s*[xX×]\s*(\d+)/.test(value);
            
            if (isDimensionColumn) {
              // Check for various dimension patterns in the value
              const dimensionPattern = /(\d+)\s*[xX×]\s*(\d+)/;
              const match = value.match(dimensionPattern);
              
              if (match) {
                processedRow['Width'] = match[1].trim();
                processedRow['Height'] = match[2].trim();
                // Remove the original dimension column
                delete processedRow[key];
                console.log(`Processed dimension column: "${key}" = "${value}" -> Width: ${match[1]}, Height: ${match[2]}`);
              }
            }
          });
          
          return processedRow;
        });
        
        setData(processedData);
        if (processedData.length > 0) {
          const headers = Object.keys(processedData[0]);
          console.log('JCD Headers after processing:', headers);
          console.log('Sample processed row:', processedData[0]);
          setOriginalHeaders(headers);
          // Set default visible columns, prioritizing Layout Name, Width, Height
          const defaultColumns: string[] = [];
          if (headers.includes('Layout Name')) defaultColumns.push('Layout Name');
          if (headers.includes('Width')) defaultColumns.push('Width');
          if (headers.includes('Height')) defaultColumns.push('Height');
          // Add other columns if we have less than 3
          headers.forEach(header => {
            if (!defaultColumns.includes(header) && defaultColumns.length < 5) {
              defaultColumns.push(header);
            }
          });
          setVisibleColumns(defaultColumns);
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

  // Sort data
  const filteredAndSortedData = useMemo(() => {
    const filtered = [...data];

    // Apply sorting
    if (sortConfig.key !== null) {
      filtered.sort((a, b) => {
        const valA = a[sortConfig.key!];
        const valB = b[sortConfig.key!];

        // Handle numeric sorting for width/height columns
        if (sortConfig.key && (sortConfig.key === 'Width' || sortConfig.key === 'Height')) {
          const numA = parseInt(String(valA).replace(/[^0-9]/g, '')) || 0;
          const numB = parseInt(String(valB).replace(/[^0-9]/g, '')) || 0;
          return sortConfig.direction === 'ascending' ? numA - numB : numB - numA;
        }

        // Handle general numeric sorting
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
    }

    return filtered;
  }, [data, sortConfig]);

  const requestSort = (key: string) => {
    let direction: SortDirection = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };


  const displayHeaders = originalHeaders.filter(header => visibleColumns.includes(header));

  if (loading) {
    return (
      <section className="container mx-auto py-10 px-4">
        <div className="text-center">Loading JCD layouts...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container mx-auto py-10 px-4">
        <div className="text-center text-red-600">
          <h2 className="text-2xl font-bold mb-4">Error Loading JCD Data</h2>
          <p>{error}</p>
          <p className="mt-4 text-sm text-gray-600">
            Make sure you have added a &quot;JCD&quot; sheet to your layouts.xlsx file.
          </p>
        </div>
      </section>
    );
  }

  if (data.length === 0) {
    return (
      <section className="container mx-auto py-10 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No JCD Data Found</h2>
          <p className="text-gray-600">
            Add a &quot;JCD&quot; sheet to your layouts.xlsx file with layout data.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto py-10 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">JCD Layouts</h1>
        <h2 className="text-2xl font-semibold text-primary">Layout Specifications & Dimensions</h2>
      </div>


      <p className="text-center text-xl font-bold mb-4">
        Total Layouts: <AnimatedCounter end={data.length} className="text-primary" />
      </p>

      {/* JCD Layouts Table */}
      <div className="rounded-lg border overflow-x-auto shadow-lg">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-gray-100 [&_th]:text-black [&_th]:font-semibold [&_th]:text-xs [&_th]:p-2">
              {displayHeaders.map((header) => (
                <TableHead
                  key={header}
                  className="cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                  onClick={() => requestSort(header)}
                >
                  <div className="flex items-center">
                    <span>{header}</span>
                    {header === 'Layout Name' && (
                      <span className="text-primary ml-1">▲</span>
                    )}
                    <span className="ml-1">
                      {sortConfig.key === header ? (
                        sortConfig.direction === 'ascending' ? (
                          <span className="text-primary">▲</span>
                        ) : (
                          <span className="text-primary">▼</span>
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
            {filteredAndSortedData.map((row, rowIndex) => (
              <TableRow key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                {displayHeaders.map((header) => (
                  <TableCell key={header}>
                    {header === 'Width' || header === 'Height' ? (
                      <span>
                        {typeof row[header] === 'number' 
                          ? (row[header] as number).toLocaleString()
                          : String(row[header] || '')}
                      </span>
                    ) : header === 'Ratio' && typeof row[header] === 'number' ? (
                      <span>
                        {(row[header] as number).toFixed(2)}
                      </span>
                    ) : (
                      typeof row[header] === 'number' 
                        ? (row[header] as number).toLocaleString()
                        : String(row[header] || '')
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Summary Information */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="font-medium">Total Layouts:</span> {data.length}
          </div>
          <div>
            <span className="font-medium">Filtered Results:</span> {filteredAndSortedData.length}
          </div>
          <div>
            <span className="font-medium">Data Columns:</span> {originalHeaders.length}
          </div>
          <div>
            <span className="font-medium">Visible Columns:</span> {visibleColumns.length}
          </div>
        </div>
      </div>
    </section>
  );
}
