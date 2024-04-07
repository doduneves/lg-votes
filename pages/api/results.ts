import { DataFiles } from "@/utils/enums";
import { parseCSV } from "@/utils/parseCSV";

import type { NextApiRequest, NextApiResponse } from 'next'

export function retrieveVoteResultsInfo(fields: string[] = []) {
    const WITH_LEGISLATORS: boolean = fields.includes('legislators');
    const WITH_VOTES: boolean = fields.includes('votes');
    const WITH_BILLS: boolean = fields.includes('bills');

    const voteResultsData: any[] = parseCSV(DataFiles.RESULTS);

    let avaiableLegislators: any[] = [];
    if (WITH_LEGISLATORS) {
        const legislatorsData: any[] = parseCSV(DataFiles.LEGISLATORS);
        const legilatorsIds = voteResultsData.map(v => v.legislator_id);
        avaiableLegislators = legislatorsData.filter(l => legilatorsIds.includes(l.id));
    }

    let completeVotesData: any[] = [];
    if (WITH_VOTES) {
        const votesData: any[] = parseCSV(DataFiles.VOTES);
        const votesIds = voteResultsData.map(v => v.vote_id);
        const avaiableVotes = votesData.filter(v => votesIds.includes(v.id));

        if (WITH_BILLS) {
            const billsData: any[] = parseCSV(DataFiles.BILLS);

            avaiableVotes.forEach((vote) => {
                completeVotesData.push({
                    ...vote,
                    bill: billsData.find(b => b.id == vote.bill_id),
                })
            })
        } else {
            completeVotesData = avaiableVotes;
        }
    }

    if (!WITH_LEGISLATORS && !WITH_VOTES) return voteResultsData;

    const deepResultsData: any[] = [];

    voteResultsData.forEach((r) => {
        let result = r

        if (WITH_LEGISLATORS) {
            result = {
                ...result,
                legislator: avaiableLegislators.find(l => l.id == r.legislator_id),
            }
        }

        if (WITH_VOTES) {
            result = {
                ...result,
                vote: completeVotesData.find(v => v.id == r.vote_id),
            }
        }

        deepResultsData.push(result)
    })
    return deepResultsData;

}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const deepResultsData = retrieveVoteResultsInfo(['votes', 'legislators', 'bills']);
    res.status(200).json(deepResultsData);
}
