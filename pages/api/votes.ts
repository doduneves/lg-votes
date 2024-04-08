import { IBill, IVote } from "@/interfaces/interfaces";
import { DataFiles } from "@/utils/enums";
import { parseCSV } from "@/utils/parseCSV";

import type { NextApiRequest, NextApiResponse } from 'next'
import { retrieveBillsInfo } from "./bills";

export function retrieveVotesInfo(
    fields: string[] = [],
    exclusiveIds: string[] = [],
): Array<IVote> {
    const WITH_BILLS: boolean = fields.includes('bills');

    let votesData = parseCSV(DataFiles.VOTES) as Array<IVote>;
    if (exclusiveIds.length) {
        votesData = votesData.filter(v => exclusiveIds.includes(v.id.toString()));
    }

    if (WITH_BILLS) {
        const billsIds = votesData.map(v => v.bill_id?.toString());
        const billsData = retrieveBillsInfo([], billsIds);

        votesData.forEach((vote) => {
            vote.bill = billsData.find(b => b.id == vote.bill_id) as IBill;
        })
    }

    return votesData
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const votesData: Array<IVote> = retrieveVotesInfo(['bills']);
    res.status(200).json(votesData);
}
