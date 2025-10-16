'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { jsPDF } from 'jspdf';

interface LayoutDetail {
  [key: string]: string | number | boolean | null | undefined;
}

export default function LayoutDetailPage() {
  const params = useParams();
  const layoutName = params.name as string;
  const decodedLayoutName = decodeURIComponent(layoutName);
  
  const [layout, setLayout] = useState<LayoutDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLayoutDetails() {
      try {
        const response = await fetch('/api/layouts');
        if (!response.ok) {
          throw new Error('Failed to fetch layouts');
        }
        
        const layouts = await response.json();
        const foundLayout = layouts.find((l: LayoutDetail) => 
          String(l.Layout).toLowerCase() === decodedLayoutName.toLowerCase()
        );
        
        if (!foundLayout) {
          throw new Error(`Layout "${decodedLayoutName}" not found`);
        }
        
        // We'll directly use the Canvas Width and Canvas Height from the Excel data
        // No special cases - using exactly what's in the Excel sheet
        
        setLayout(foundLayout);
      } catch (error) {
        console.error('Error fetching layout details:', error);
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    }
    
    fetchLayoutDetails();
  }, [decodedLayoutName]);

  // Format layout data into specification rows
  const getSpecificationRows = () => {
    if (!layout) return [];
    
    const rows = [
      { label: 'Layout', value: layout.Layout },
      { label: 'Width', value: `${layout.Width || 0} pixels` },
      { label: 'Height', value: `${layout.Height || 0} pixels` },
      { label: 'Canvas Width', value: `${layout['Canvas width'] || 0} pixels` },
      { label: 'Canvas Height', value: `${layout['Canvas height'] || 0} pixels` },
      { label: 'Frame rate', value: '30 frames per second' },
      { label: 'Video Format', value: 'MP4' },
      { label: 'Codec', value: '(High profile, level 5.2, VBR)' },
      { label: 'Field order', value: 'Progressive' },
      { label: 'Pixel Aspect Ratio', value: '1:1 Square Pixel' },
      { label: 'Bit Rate', value: '10 mbps or higher' },
      { label: 'Duration', value: 'Unlimited' },
      { label: 'Audio', value: 'None' },
      { label: 'Loop', value: 'None (please do not loop video because player will loop it seamlessly)' }
    ];
    
    return rows;
  };

  // Calculate aspect ratio for the preview
  const calculatePreviewDimensions = () => {
    if (!layout) return { width: 0, height: 0 };
    
    const width = Number(layout.Width) || 1080;
    const height = Number(layout.Height) || 1920;
    
    // Calculate aspect ratio
    const ratio = width / height;
    
    // Determine if it's a portrait or landscape orientation
    const isPortrait = height > width;
    
    // Set maximum dimensions based on orientation
    const maxWidth = 500;
    const maxHeight = 500;
    
    let previewWidth, previewHeight;
    
    if (isPortrait) {
      // For portrait (mobile-like) orientations
      previewHeight = Math.min(maxHeight, height);
      previewWidth = previewHeight * ratio;
    } else {
      // For landscape (desktop-like) orientations
      previewWidth = Math.min(maxWidth, width);
      previewHeight = previewWidth / ratio;
    }
    
    return {
      width: previewWidth,
      height: previewHeight
    };
  };

  const previewDimensions = calculatePreviewDimensions();

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl">Loading layout details...</h2>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl text-red-500">Error: {error}</h2>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Function to generate and download PDF
  const downloadPDF = () => {
    if (!layout) return;

    const doc = new jsPDF();
    const tableColumn = ["Specification", "Value"];
    const tableRows = getSpecificationRows().map(row => [row.label, row.value]);

    doc.setFontSize(20);
    doc.text(`${layout.Layout} - Content Specifications`, 14, 22);
    
    // Simple table creation without jspdf-autotable
    let yPos = 40;
    const colWidth = [80, 110];
    const rowHeight = 10;
    
    // Set header style
    doc.setFillColor(0, 200, 83);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    
    // Draw header
    doc.rect(14, yPos - 6, colWidth[0] + colWidth[1], rowHeight, 'F');
    doc.text(tableColumn[0], 20, yPos);
    doc.text(tableColumn[1], 20 + colWidth[0], yPos);
    yPos += rowHeight + 4;
    
    // Reset style for rows
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    
    // Draw rows
    tableRows.forEach((row, i) => {
      // Alternate row background
      if (i % 2 === 0) {
        doc.setFillColor(240, 240, 240);
        doc.rect(14, yPos - 6, colWidth[0] + colWidth[1], rowHeight, 'F');
      }
      
      doc.text(String(row[0]), 20, yPos);
      doc.text(String(row[1]), 20 + colWidth[0], yPos);
      yPos += rowHeight;
      
      // Add new page if needed
      if (yPos > 280) {
        doc.addPage();
        yPos = 20;
      }
    });

    doc.save(`${layout.Layout}-specifications.pdf`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto py-10 px-4">
          <h1 className="text-3xl font-bold mb-6 text-center">
            {layout?.Layout}
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left column: Content Specifications Table */}
            <div>
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-primary">
                      <TableHead colSpan={2} className="p-3 text-xl font-bold text-white">Content Specifications</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="[&_tr]:h-10">
                    {getSpecificationRows().map((row, index) => (
                      <TableRow key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                        <TableCell className="font-medium py-1.5 px-3">{row.label}</TableCell>
                        <TableCell className="py-1.5 px-3">{row.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4">
                <Button onClick={downloadPDF} className="bg-primary hover:bg-primary">
                  Download PDF
                </Button>
              </div>
            </div>
            
            {/* Right column: Resolution Preview */}
            <div>
              <div className="flex items-center justify-center h-[500px]">
                <div 
                  className="border-2 border-gray-300 bg-primary/10 flex items-center justify-center"
                  style={{
                    width: `${previewDimensions.width}px`,
                    height: `${previewDimensions.height}px`,
                    maxWidth: '100%',
                    maxHeight: '100%'
                  }}
                >
                  <div className="text-center p-4">
                    <p className="font-bold">{layout?.Layout}</p>
                    <p>{layout?.Width} × {layout?.Height}</p>
                  </div>
                </div>
              </div>
              <h2 className="text-xl font-semibold mt-3 text-center">Resolution Preview</h2>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
