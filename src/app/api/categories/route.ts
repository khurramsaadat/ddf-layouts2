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
    
    // Look for Categories sheet
    const categoriesSheetName = workbook.SheetNames.find(name => 
      name.toLowerCase().includes('categories') || name.toLowerCase().includes('category')
    );
    
    if (!categoriesSheetName) {
      return NextResponse.json({ 
        error: 'Categories sheet not found. Please add a sheet named "Categories" to your Excel file.' 
      }, { status: 404 });
    }

    const sheet = workbook.Sheets[categoriesSheetName];
    const data = xlsx.utils.sheet_to_json(sheet);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading categories:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
