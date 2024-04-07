import Papa, { ParseResult } from 'papaparse';
import fs from 'fs';


export const parseCSV = (filePath: string) => {
    const content = fs.readFileSync(filePath, "utf-8");
    const { data } = Papa.parse(content, {
        header: true,
    })

    return data;
}