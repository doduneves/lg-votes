import { IVote } from "@/interfaces/interfaces";
import { DataFiles } from "@/utils/enums";
import { parseCSV } from "@/utils/parseCSV";

import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const votesData = parseCSV(DataFiles.VOTES) as Array<IVote>;
    res.status(200).json(votesData);
}
