import { parseCSV } from "@/utils/parseCSV";
import { NextResponse } from "next/server"

const filePath: string = 'data/csv/votes.csv';

export async function GET() {
    const data = parseCSV(filePath);
    return NextResponse.json(data)
}