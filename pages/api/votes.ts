import { DataFiles } from "@/utils/enums";
import { parseCSV } from "@/utils/parseCSV";

import { ParseResult } from 'papaparse';
import type { NextApiRequest, NextApiResponse } from 'next'

// interface IVote {
//     id: string;
//     bill_id: string;
// }

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const votesData: any[] = parseCSV(DataFiles.VOTES);
    const billsData: any[] = parseCSV(DataFiles.BILLS);

    const billsIds = votesData.map((v: any) => v.bill_id)
    console.log(billsIds)
    console.log(billsData.filter((x: any) => billsIds.includes(x.id)))
    // console.log(billsData.filter((x: any) => billsIds.includes(x.id)))

    res.status(200).json(votesData);
}
