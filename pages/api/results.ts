import type { NextApiRequest, NextApiResponse } from 'next'

import { DataFiles } from "@/utils/enums";
import { parseCSV } from "@/utils/parseCSV";
import { IBill, ILegislator, IVote, IVoteResult } from '@/interfaces/interfaces';

export function retrieveVoteResultsInfo(fields: string[] = []): Array<IVoteResult> {
    const WITH_LEGISLATORS: boolean = fields.includes('legislators');
    const WITH_VOTES: boolean = fields.includes('votes');
    const WITH_BILLS: boolean = fields.includes('bills');

    const voteResultsData = parseCSV(DataFiles.RESULTS) as Array<IVoteResult>;

    let legislatorsData: Array<ILegislator> = [];
    if (WITH_LEGISLATORS) {
        legislatorsData = parseCSV(DataFiles.LEGISLATORS) as Array<ILegislator>;
        const legilatorsIds = voteResultsData.map(v => v.legislator_id);
        legislatorsData = legislatorsData.filter(l => legilatorsIds.includes(l.id));
    }

    let votesData: Array<IVote> = [];
    let billsData: Array<IBill> = [];

    if (WITH_VOTES) {
        votesData = parseCSV(DataFiles.VOTES) as Array<IVote>;
        const votesIds = voteResultsData.map(v => v.vote_id);
        votesData = votesData.filter(v => votesIds.includes(v.id));

        if (WITH_BILLS) {
            billsData = parseCSV(DataFiles.BILLS) as Array<IBill>;

            votesData.forEach((vote) => {
                vote.bill = billsData.find(b => b.id == vote.bill_id) as IBill;
            })
        }

    }

    if (!WITH_LEGISLATORS && !WITH_VOTES) return voteResultsData;

    voteResultsData.forEach((r) => {
        if (WITH_LEGISLATORS) {
            r.legislator = legislatorsData.find(l => l.id == r.legislator_id) as ILegislator;
        }

        if (WITH_VOTES) {
            r.vote = votesData.find(v => v.id == r.vote_id) as IVote;
        }
    })
    return voteResultsData;

}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const resultsData: Array<IVoteResult> = retrieveVoteResultsInfo(['votes', 'legislators', 'bills']);
    res.status(200).json(resultsData);
}
