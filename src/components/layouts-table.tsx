'use client';

import {
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';

interface Layout {
  [key: string]: string | number | boolean | null | undefined;
}

interface LayoutsTableProps {
  data: Layout[];
  visibleColumns: string[];
  originalHeaders: string[];
}

export default function LayoutsTable({
  data,
  visibleColumns,
  originalHeaders,
}: LayoutsTableProps) {

  const displayHeaders = originalHeaders.map(header => header === 'Layout' ? 'Layout Name' : header).filter(header => visibleColumns.includes(header));

  return (
    <TableBody>
      {data.map((row, rowIndex) => (
        <TableRow key={rowIndex} className="h-8">
          {displayHeaders.map((header) => (
            <TableCell key={header} className={`text-xs p-2 ${header === 'Layout Name' ? 'w-2/6' : 'w-1/6'}`}>
              {header === 'Layout Name' && row['Layout']
                ? (
                  <Link 
                    href={`/layout/${encodeURIComponent(String(row['Layout']))}`}
                    className="text-primary hover:underline font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {row['Layout']}
                  </Link>
                )
                : header === 'Ratio' && typeof row[originalHeaders[originalHeaders.map(h => h === 'Layout' ? 'Layout Name' : h).indexOf(header)]] === 'number'
                ? (row[originalHeaders[originalHeaders.map(h => h === 'Layout' ? 'Layout Name' : h).indexOf(header)]] as number).toFixed(2)
                : row[originalHeaders[originalHeaders.map(h => h === 'Layout' ? 'Layout Name' : h).indexOf(header)]]}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}
