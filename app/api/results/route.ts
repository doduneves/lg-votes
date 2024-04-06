import { parseCSV } from "@/utils/parseCSV";
import { NextResponse } from "next/server"

const filePath: string = 'data/csv/vote_results.csv';

export async function GET() {
    const data = parseCSV(filePath);
    return NextResponse.json(data)
}