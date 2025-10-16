'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface Vendor {
  [key: string]: string | number | boolean | null | undefined;
}

type SortDirection = 'ascending' | 'descending';

interface SortConfig {
  key: string | null;
  direction: SortDirection;
}

export default function VendorListContent() {
  const [data, setData] = useState<Vendor[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'ascending' });
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  const [originalHeaders, setOriginalHeaders] = useState<string[]>([]);
  const [columnFilters, setColumnFilters] = useState<Record<string, string[]>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCompany, setFilterCompany] = useState<string>('all');
  const [filterBrand, setFilterBrand] = useState<string>('all');
  const [filterCountry, setFilterCountry] = useState<string>('all');
  const [filterLocation, setFilterLocation] = useState<string>('all');
  const [filterZone, setFilterZone] = useState<string>('all');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/vendor-list');
        if (!response.ok) {
          throw new Error('Failed to fetch vendor list data');
        }
        const result = await response.json();
        setData(result);
        if (result.length > 0) {
          const allHeaders = Object.keys(result[0]);
          
          // Remove _EMPTY columns and reorder with Company first, Brand second
          const filteredHeaders = allHeaders.filter(header => 
            !header.toLowerCase().includes('_empty') && 
            !header.toLowerCase().includes('empty')
          );
          
          // Reorder columns: Company first, Brand second, then others
          const reorderedHeaders = [];
          
          // Find Company column
          const companyHeader = filteredHeaders.find(header => 
            header.toLowerCase().includes('company')
          );
          if (companyHeader) {
            reorderedHeaders.push(companyHeader);
          }
          
          // Find Brand column
          const brandHeader = filteredHeaders.find(header => 
            header.toLowerCase().includes('brand')
          );
          if (brandHeader) {
            reorderedHeaders.push(brandHeader);
          }
          
          // Add remaining columns
          filteredHeaders.forEach(header => {
            if (header !== companyHeader && header !== brandHeader) {
              reorderedHeaders.push(header);
            }
          });
          
          setOriginalHeaders(reorderedHeaders);
          // Set default visible columns (first 8 columns or all if less than 8 for full width)
          setVisibleColumns(reorderedHeaders.slice(0, Math.min(8, reorderedHeaders.length)));
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

  // Get unique values for each column for filtering
  const getUniqueValues = (columnKey: string) => {
    const values = data.map(row => String(row[columnKey] || '')).filter(val => val !== '');
    const uniqueValues = Array.from(new Set(values)).sort();
    return uniqueValues;
  };

  // Get unique values for filter dropdowns with more specific matching
  const getUniqueValuesForColumn = useCallback((searchTerms: string[], exactMatch = false) => {
    const column = originalHeaders.find(header => {
      const headerLower = header.toLowerCase();
      if (exactMatch) {
        return searchTerms.some(term => headerLower === term.toLowerCase());
      } else {
        return searchTerms.some(term => headerLower.includes(term.toLowerCase()));
      }
    });
    if (column) {
      const values = data.map(row => String(row[column] || '')).filter(val => val !== '' && val !== 'undefined' && val !== 'null');
      const uniqueValues = Array.from(new Set(values)).sort();
      return uniqueValues;
    }
    return [];
  }, [data, originalHeaders]);

  // Debug: Log available headers
  console.log('Available headers:', originalHeaders);

  const companies = useMemo(() => getUniqueValuesForColumn(['company']), [getUniqueValuesForColumn]);
  const brands = useMemo(() => getUniqueValuesForColumn(['brand']), [getUniqueValuesForColumn]);
  const countries = useMemo(() => {
    // Try different variations for country
    let values = getUniqueValuesForColumn(['country/city']);
    if (values.length === 0) values = getUniqueValuesForColumn(['country']);
    if (values.length === 0) values = getUniqueValuesForColumn(['city']);
    return values;
  }, [getUniqueValuesForColumn]);
  const locations = useMemo(() => getUniqueValuesForColumn(['location']), [getUniqueValuesForColumn]);
  const zones = useMemo(() => getUniqueValuesForColumn(['zone']), [getUniqueValuesForColumn]);

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = [...data];

    // Apply individual filters
    const applyFilter = (filterValue: string, searchTerms: string[]) => {
      if (filterValue !== 'all') {
        const column = originalHeaders.find(header => 
          searchTerms.some(term => header.toLowerCase().includes(term.toLowerCase()))
        );
        if (column) {
          filtered = filtered.filter(row => {
            const cellValue = String(row[column] || '');
            return cellValue === filterValue;
          });
        }
      }
    };

    applyFilter(filterCompany, ['company']);
    applyFilter(filterBrand, ['brand']);
    applyFilter(filterCountry, ['country/city', 'country']);
    applyFilter(filterLocation, ['location']);
    applyFilter(filterZone, ['zone']);

    // Apply column filters
    Object.entries(columnFilters).forEach(([column, selectedValues]) => {
      if (selectedValues.length > 0) {
        filtered = filtered.filter(row => {
          const cellValue = String(row[column] || '');
          return selectedValues.includes(cellValue);
        });
      }
    });

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(row =>
        Object.values(row).some(value =>
          String(value || '').toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply sorting
    if (sortConfig.key !== null) {
      filtered.sort((a, b) => {
        const valA = a[sortConfig.key!];
        const valB = b[sortConfig.key!];

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
    }

    return filtered;
  }, [data, columnFilters, searchTerm, sortConfig, filterCompany, filterBrand, filterCountry, filterLocation, filterZone, originalHeaders]);

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

  const handleFilterChange = (column: string, value: string, isChecked: boolean) => {
    setColumnFilters(prev => {
      const currentFilters = prev[column] || [];
      if (isChecked) {
        return { ...prev, [column]: [...currentFilters, value] };
      } else {
        return { ...prev, [column]: currentFilters.filter(v => v !== value) };
      }
    });
  };

  const handleSelectAllFilter = (column: string, isChecked: boolean) => {
    const uniqueValues = getUniqueValues(column);
    setColumnFilters(prev => ({
      ...prev,
      [column]: isChecked ? uniqueValues : []
    }));
  };

  const clearColumnFilter = (column: string) => {
    setColumnFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[column];
      return newFilters;
    });
  };

  const hasActiveFilter = (column: string) => {
    return columnFilters[column] && columnFilters[column].length > 0;
  };

  if (loading) {
    return (
      <section className="container mx-auto py-10 px-4">
        <div className="text-center">Loading vendor list...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container mx-auto py-10 px-4">
        <div className="text-center text-red-600">
          <h2 className="text-2xl font-bold mb-4">Error Loading Vendor List</h2>
          <p>{error}</p>
          <p className="mt-4 text-sm text-gray-600">
            Make sure you have added a &quot;Vendor List&quot; sheet to your layouts.xlsx file.
          </p>
        </div>
      </section>
    );
  }

  if (data.length === 0) {
    return (
      <section className="container mx-auto py-10 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No Vendor Data Found</h2>
          <p className="text-gray-600">
            Add a &quot;Vendor List&quot; sheet to your layouts.xlsx file with vendor data.
          </p>
        </div>
      </section>
    );
  }

  const displayHeaders = originalHeaders.filter(header => visibleColumns.includes(header));

  return (
    <section className="w-full py-10 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Digital Signage Player Network</h1>
        <h2 className="text-2xl font-semibold text-primary">Vendor List</h2>
      </div>
      
      {/* Column Visibility Controls */}
      <h3 className="text-xl font-semibold text-center mb-4">Column Visibility</h3>
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
                className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {header}
              </label>
            </div>
          );
        })}
      </div>

      {/* Search Input */}
      <div className="mb-6 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search all columns..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Filter Dropdowns */}
      <div className="mb-6 flex flex-wrap justify-center gap-4">
        {/* Company Filter */}
        {companies.length > 0 && (
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium">Company:</label>
            <select 
              value={filterCompany} 
              onChange={(e) => setFilterCompany(e.target.value)}
              className="px-2 py-1 border border-gray-300 rounded text-xs min-w-[120px] focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All</option>
              {companies.map(company => (
                <option key={company} value={company}>{company}</option>
              ))}
            </select>
          </div>
        )}

        {/* Brand Filter */}
        {brands.length > 0 && (
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium">Brand:</label>
            <select 
              value={filterBrand} 
              onChange={(e) => setFilterBrand(e.target.value)}
              className="px-2 py-1 border border-gray-300 rounded text-xs min-w-[120px] focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>
        )}

        {/* Country Filter */}
        {countries.length > 0 && (
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium">Country:</label>
            <select 
              value={filterCountry} 
              onChange={(e) => setFilterCountry(e.target.value)}
              className="px-2 py-1 border border-gray-300 rounded text-xs min-w-[120px] focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
        )}

        {/* Location Filter */}
        {locations.length > 0 && (
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium">Location:</label>
            <select 
              value={filterLocation} 
              onChange={(e) => setFilterLocation(e.target.value)}
              className="px-2 py-1 border border-gray-300 rounded text-xs min-w-[120px] focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
        )}

        {/* Zone Filter */}
        {zones.length > 0 && (
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium">Zone:</label>
            <select 
              value={filterZone} 
              onChange={(e) => setFilterZone(e.target.value)}
              className="px-2 py-1 border border-gray-300 rounded text-xs min-w-[120px] focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All</option>
              {zones.map(zone => (
                <option key={zone} value={zone}>{zone}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="text-center text-sm text-gray-600 mb-4 space-y-1">
        <p>Total Vendors: {data.length} | Filtered: {filteredAndSortedData.length}</p>
        {(Object.keys(columnFilters).length > 0 || filterCompany !== 'all' || filterBrand !== 'all' || filterCountry !== 'all' || filterLocation !== 'all' || filterZone !== 'all') && (
          <div className="flex flex-wrap justify-center gap-2">
            {filterCompany !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                Company: {filterCompany}
                <button
                  onClick={() => setFilterCompany('all')}
                  className="ml-1 hover:text-blue-600"
                >
                  ×
                </button>
              </span>
            )}
            {filterBrand !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                Brand: {filterBrand}
                <button
                  onClick={() => setFilterBrand('all')}
                  className="ml-1 hover:text-green-600"
                >
                  ×
                </button>
              </span>
            )}
            {filterCountry !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                Country: {filterCountry}
                <button
                  onClick={() => setFilterCountry('all')}
                  className="ml-1 hover:text-purple-600"
                >
                  ×
                </button>
              </span>
            )}
            {filterLocation !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">
                Location: {filterLocation}
                <button
                  onClick={() => setFilterLocation('all')}
                  className="ml-1 hover:text-orange-600"
                >
                  ×
                </button>
              </span>
            )}
            {filterZone !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 bg-pink-100 text-pink-800 rounded text-xs">
                Zone: {filterZone}
                <button
                  onClick={() => setFilterZone('all')}
                  className="ml-1 hover:text-pink-600"
                >
                  ×
                </button>
              </span>
            )}
            {Object.entries(columnFilters).map(([column, values]) => (
              values.length > 0 && (
                <span key={column} className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                  {column}: {values.length} selected
                  <button
                    onClick={() => clearColumnFilter(column)}
                    className="ml-1 hover:text-primary/70"
                  >
                    ×
                  </button>
                </span>
              )
            ))}
          </div>
        )}
      </div>

      {/* Vendor List Table */}
      <div className="w-full rounded-lg border overflow-x-auto shadow-lg">
        <Table className="w-full min-w-max">
          <TableHeader className="bg-gray-50">
            <TableRow>
              {displayHeaders.map((header) => (
                <TableHead key={header} className="text-xs font-semibold p-2">
                  <div className="flex items-center justify-between gap-1">
                    <div 
                      className="flex items-center gap-2 cursor-pointer hover:text-primary flex-1"
                      onClick={() => requestSort(header)}
                    >
                      <span className="text-gray-700">{header}</span>
                      <span className={sortConfig.key === header ? 'text-primary' : 'text-gray-400'}>
                        {sortConfig.key === header ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : '↕'}
                      </span>
                    </div>
                    
                    {/* Filter Dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className={`h-4 w-4 p-0 ${hasActiveFilter(header) ? 'text-primary' : 'text-gray-400'}`}
                        >
                          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                          </svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-64 max-h-80 overflow-y-auto">
                        <DropdownMenuLabel className="flex items-center justify-between">
                          <span>Filter by {header}</span>
                          {hasActiveFilter(header) && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => clearColumnFilter(header)}
                              className="h-4 px-1 text-xs"
                            >
                              Clear
                            </Button>
                          )}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        
                        {/* Select All Option */}
                        <DropdownMenuCheckboxItem
                          checked={columnFilters[header]?.length === getUniqueValues(header).length}
                          onCheckedChange={(checked) => handleSelectAllFilter(header, checked as boolean)}
                          className="font-medium"
                        >
                          (Select All)
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuSeparator />
                        
                        {/* Individual Filter Options */}
                        {getUniqueValues(header).map((value) => (
                          <DropdownMenuCheckboxItem
                            key={value}
                            checked={columnFilters[header]?.includes(value) || false}
                            onCheckedChange={(checked) => handleFilterChange(header, value, checked as boolean)}
                          >
                            {value || '(Blank)'}
                          </DropdownMenuCheckboxItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedData.map((row, rowIndex) => (
              <TableRow key={rowIndex} className="hover:bg-gray-50 transition-colors h-8">
                {displayHeaders.map((header) => (
                  <TableCell key={header} className="text-xs p-2 border-b whitespace-nowrap">
                    <div className="max-w-[150px] truncate" title={String(row[header] || '')}>
                      {typeof row[header] === 'number' 
                        ? (row[header] as number).toLocaleString()
                        : String(row[header] || '')}
                    </div>
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
            <span className="font-medium">Total Vendors:</span> {data.length}
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
        {Object.keys(columnFilters).length > 0 && (
          <div className="mt-3 pt-3 border-t">
            <span className="font-medium text-sm">Active Filters:</span>
            <div className="mt-1 flex flex-wrap gap-1">
              {Object.entries(columnFilters).map(([column, values]) => (
                values.length > 0 && (
                  <span key={column} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                    {column} ({values.length})
                  </span>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
