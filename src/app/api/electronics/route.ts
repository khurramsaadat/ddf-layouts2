import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'layouts.xlsx');
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Excel file not found' }, { status: 404 });
    }

    const file = fs.readFileSync(filePath);
    const workbook = XLSX.read(file, { type: 'buffer' });
    
    // Look for Electronics sheet with flexible naming
    const electronicsSheetName = workbook.SheetNames.find(name => 
      name.toLowerCase().includes('electronics') || 
      name.toLowerCase().includes('electronic') ||
      name.toLowerCase().includes('elec')
    );
    
    if (!electronicsSheetName) {
      // Return available sheet names for debugging
      return NextResponse.json({ 
        error: 'Electronics sheet not found', 
        availableSheets: workbook.SheetNames,
        message: 'Please add a sheet named "Electronics" to your Excel file or ensure the sheet name contains "electronics".' 
      }, { status: 404 });
    }

    const worksheet = workbook.Sheets[electronicsSheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    
    if (jsonData.length === 0) {
      return NextResponse.json({ error: 'No data found in Electronics sheet' }, { status: 404 });
    }

    // Get headers from first row
    const headers = jsonData[0] as string[];
    
    // Convert data rows to objects
    const data = jsonData.slice(1).map((row: any[]) => {
      const obj: any = {};
      headers.forEach((header, index) => {
        obj[header] = row[index] || '';
      });
      return obj;
    }).filter(row => {
      // Filter out empty rows
      return Object.values(row).some(value => value !== '');
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading electronics data:', error);
    return NextResponse.json({ error: 'Failed to read electronics data' }, { status: 500 });
  }
}
