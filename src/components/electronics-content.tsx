'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import AnimatedCounter from '@/components/animated-counter';

interface ElectronicsData {
  [key: string]: string | number;
}

interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

interface ElectronicsContentProps {
  searchTerm?: string;
}

export default function ElectronicsContent({ searchTerm = '' }: ElectronicsContentProps) {
  const [data, setData] = useState<ElectronicsData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'Layout Name', direction: 'asc' });
  const [visibleColumns, setVisibleColumns] = useState<{ [key: string]: boolean }>({});
  const [originalHeaders, setOriginalHeaders] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/electronics');
        if (!response.ok) {
          throw new Error('Failed to fetch electronics data');
        }
        const result = await response.json();
        
        if (result.length > 0) {
          // Get original headers and set up column visibility
          const headers = Object.keys(result[0]);
          setOriginalHeaders(headers);
          
          // Map 'Layout' to 'Layout Name' for display
          const processedData = result.map((item: any) => {
            const processed = { ...item };
            if (processed.Layout) {
              processed['Layout Name'] = processed.Layout;
              delete processed.Layout;
            }
            return processed;
          });
          
          setData(processedData);
          
          // Initialize visible columns (all visible by default)
          const initialVisibility: { [key: string]: boolean } = {};
          headers.forEach(header => {
            const displayHeader = header === 'Layout' ? 'Layout Name' : header;
            initialVisibility[displayHeader] = true;
          });
          setVisibleColumns(initialVisibility);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    };

    fetchData();
  }, []);

  const sortedData = useMemo(() => {
    if (!data.length) return [];

    let filteredData = data;
    
    // Apply search filter
    if (searchTerm) {
      filteredData = data.filter(item =>
        Object.values(item).some(value =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply sorting
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      // Handle numeric sorting for specific columns
      const numericColumns = ['Width', 'Height', 'Canvas width', 'Canvas height', 'Ratio'];
      if (numericColumns.includes(sortConfig.key)) {
        const aNum = parseFloat(aValue?.toString() || '0');
        const bNum = parseFloat(bValue?.toString() || '0');
        return sortConfig.direction === 'asc' ? aNum - bNum : bNum - aNum;
      }

      // String sorting
      const aStr = aValue?.toString() || '';
      const bStr = bValue?.toString() || '';
      
      if (sortConfig.direction === 'asc') {
        return aStr.localeCompare(bStr);
      } else {
        return bStr.localeCompare(aStr);
      }
    });
  }, [data, sortConfig, searchTerm]);

  // Split data into two halves for two-column display
  const midPoint = Math.ceil(sortedData.length / 2);
  const firstHalfData = sortedData.slice(0, midPoint);
  const secondHalfData = sortedData.slice(midPoint);

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleColumnVisibilityChange = (column: string, checked: boolean) => {
    setVisibleColumns(prev => ({
      ...prev,
      [column]: checked
    }));
  };

  const getSortIcon = (columnName: string) => {
    if (sortConfig.key !== columnName) {
      return <span className="text-gray-400 ml-1">↕</span>;
    }
    return (
      <span className="text-primary ml-1">
        {sortConfig.direction === 'asc' ? '▲' : '▼'}
      </span>
    );
  };

  const isSpecialLayout = (layoutName: string) => {
    const specialLayouts = [
      'CA_DM801 Innov8 part1',
      'CA_DM801 Innov8 part2',
      'CB_DM504_DM505_DM506'
    ];
    return specialLayouts.includes(layoutName);
  };

  const renderLayoutName = (layoutName: string) => {
    if (isSpecialLayout(layoutName)) {
      return <span className="text-gray-700">{layoutName}</span>;
    }
    return (
      <Link 
        href={`/layout/${encodeURIComponent(layoutName)}`}
        className="text-primary hover:text-primary/80 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {layoutName}
      </Link>
    );
  };

  const renderTable = (tableData: ElectronicsData[], tableKey: string) => {
    if (!tableData.length) return null;

    const visibleColumnKeys = Object.keys(visibleColumns).filter(key => visibleColumns[key]);

    return (
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-gray-50">
              <tr>
                {visibleColumnKeys.map((column) => (
                  <th
                    key={`${tableKey}-${column}`}
                    className="px-2 py-2 text-left font-medium text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => requestSort(column)}
                  >
                    <div className="flex items-center">
                      {column}
                      {getSortIcon(column)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr
                  key={`${tableKey}-${index}`}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  {visibleColumnKeys.map((column) => (
                    <td key={`${tableKey}-${index}-${column}`} className="px-2 py-1.5 text-gray-900">
                      {column === 'Layout Name' ? (
                        renderLayoutName(item[column]?.toString() || '')
                      ) : column === 'Ratio' ? (
                        parseFloat(item[column]?.toString() || '0').toFixed(2)
                      ) : (
                        item[column]?.toString() || ''
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Electronic Layouts</h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Electronic Layouts</h1>
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const visibleColumnKeys = Object.keys(visibleColumns).filter(key => visibleColumns[key]);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Electronic Layouts</h1>
        
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Total Layouts:</span>
            <span className="font-semibold text-primary">
              <AnimatedCounter end={sortedData.length} />
            </span>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Column Visibility:</span>
            {Object.keys(visibleColumns).map((column) => (
              <div key={column} className="flex items-center space-x-2">
                <Checkbox
                  id={`column-${column}`}
                  checked={visibleColumns[column]}
                  onCheckedChange={(checked) => handleColumnVisibilityChange(column, checked as boolean)}
                />
                <label
                  htmlFor={`column-${column}`}
                  className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {column}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Two-column layout for larger screens */}
      <div className="hidden lg:grid lg:grid-cols-2 lg:gap-6">
        {renderTable(firstHalfData, 'first')}
        {renderTable(secondHalfData, 'second')}
      </div>

      {/* Single column layout for smaller screens */}
      <div className="lg:hidden">
        {renderTable(sortedData, 'mobile')}
      </div>
    </div>
  );
}
