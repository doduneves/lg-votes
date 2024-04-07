import { DataFiles } from "@/utils/enums";
import { parseCSV } from "@/utils/parseCSV";

import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const data: any[] = parseCSV(DataFiles.BILLS);
    res.status(200).json(data);
}
