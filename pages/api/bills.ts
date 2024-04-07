import type { NextApiRequest, NextApiResponse } from 'next'

import { DataFiles } from "@/utils/enums";
import { parseCSV } from "@/utils/parseCSV";
import { retrieveLegislatorsInfo } from './legislators';
import { retrieveVoteResultsInfo } from './results';

export function retrieveBillsInfo(fields: string[] = []) {
    const WITH_VOTES: boolean = fields.includes('votes');
    const WITH_SPONSOR: boolean = fields.includes('sponsor');

    const billsData: any[] = parseCSV(DataFiles.BILLS);

    if (!WITH_VOTES && !WITH_SPONSOR) return billsData

    const voteResultsInfo = retrieveVoteResultsInfo(['legislators', 'votes'])
    const legislatorsInfo = retrieveLegislatorsInfo()

    billsData.forEach(b => {
        if (WITH_SPONSOR) {
            b.sponsor = legislatorsInfo.find(l => l.id = b.sponsor_id)
        }

        if (WITH_VOTES) {
            const supporters = []
            const opposers = []

            supporters.push(voteResultsInfo.filter(r => r.vote?.bill_id == b.id && r.vote_type == '1'))
            opposers.push(voteResultsInfo.filter(r => r.vote?.bill_id == b.id && r.vote_type == '2'))

            b.votes = { supporters, opposers }
        }
    })

    return billsData
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const billsData = retrieveBillsInfo(['sponsor', 'votes'])
    res.status(200).json(billsData);
}
