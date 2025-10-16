import { NextResponse } from 'next/server';
import * as xlsx from 'xlsx';
import path from 'path';
import fs from 'fs';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'layouts.xlsx');
    const file = fs.readFileSync(filePath);
    const workbook = xlsx.read(file, { type: 'buffer' });

    // Find the sheet named "JCD" (case-insensitive)
    const sheetName = workbook.SheetNames.find(name => name.toLowerCase().includes('jcd'));

    if (!sheetName) {
      return NextResponse.json({ error: 'JCD sheet not found in layouts.xlsx' }, { status: 404 });
    }

    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
