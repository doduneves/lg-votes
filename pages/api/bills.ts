import type { NextApiRequest, NextApiResponse } from 'next'

import { DataFiles } from "@/utils/enums";
import { parseCSV } from "@/utils/parseCSV";
import { retrieveLegislatorsInfo } from './legislators';
import { retrieveVoteResultsInfo } from './results';
import { IBill, ILegislator, IVoteResult } from '@/interfaces/interfaces';

export function retrieveBillsInfo(fields: string[] = []): Array<IBill> {
    const WITH_VOTES: boolean = fields.includes('votes');
    const WITH_SPONSOR: boolean = fields.includes('sponsor');

    const billsData = parseCSV(DataFiles.BILLS) as Array<IBill>;

    if (!WITH_VOTES && !WITH_SPONSOR) return billsData;

    const voteResultsInfo: Array<IVoteResult> = retrieveVoteResultsInfo(['legislators', 'votes']);
    const legislatorsInfo: Array<ILegislator> = retrieveLegislatorsInfo();

    billsData.forEach(b => {
        if (WITH_SPONSOR) {
            b.sponsor = legislatorsInfo.find(l => l.id = b.sponsor_id) as ILegislator;
        }

        if (WITH_VOTES) {
            const supporters = voteResultsInfo.filter(r => r.vote?.bill_id == b.id && r.vote_type == 1);
            const opposers = voteResultsInfo.filter(r => r.vote?.bill_id == b.id && r.vote_type == 2);

            b.votes = { supporters, opposers };
        }
    })

    return billsData
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const billsData = retrieveBillsInfo(['sponsor', 'votes']);
    res.status(200).json(billsData);
}
