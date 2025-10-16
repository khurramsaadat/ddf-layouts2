import { NextResponse } from 'next/server';
import * as xlsx from 'xlsx';
import path from 'path';
import fs from 'fs';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'layouts.xlsx');
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Excel file not found' }, { status: 404 });
    }

    const file = fs.readFileSync(filePath);
    const workbook = xlsx.read(file, { type: 'buffer' });
    
    // Look for Vendor List sheet
    const vendorSheetName = workbook.SheetNames.find(name => 
      name.toLowerCase().includes('vendor') || 
      name.toLowerCase().includes('vendor list') ||
      name.toLowerCase().includes('vendorlist')
    );
    
    if (!vendorSheetName) {
      return NextResponse.json({ 
        error: 'Vendor List sheet not found. Please add a sheet named "Vendor List" to your Excel file.' 
      }, { status: 404 });
    }

    const sheet = workbook.Sheets[vendorSheetName];
    const data = xlsx.utils.sheet_to_json(sheet);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading vendor list:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
