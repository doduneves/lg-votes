import type { NextApiRequest, NextApiResponse } from 'next'

import { DataFiles } from "@/utils/enums";
import { parseCSV } from "@/utils/parseCSV";
import { IBill, ILegislator, IVote, IVoteResult } from '@/interfaces/interfaces';
import { retrieveVotesInfo } from './votes';
import { retrieveLegislatorsInfo } from './legislators';

export function retrieveVoteResultsInfo(fields: string[] = []): Array<IVoteResult> {
    const WITH_LEGISLATORS: boolean = fields.includes('legislators');
    const WITH_VOTES: boolean = fields.includes('votes');
    const WITH_BILLS: boolean = fields.includes('bills');

    const voteResultsData = parseCSV(DataFiles.RESULTS) as Array<IVoteResult>;

    let legislatorsData: Array<ILegislator> = [];
    let votesData: Array<IVote> = [];

    if (WITH_LEGISLATORS) {
        const legilatorsIds = voteResultsData.map(v => v.legislator_id?.toString());
        legislatorsData = retrieveLegislatorsInfo([], legilatorsIds);
    }

    if (WITH_VOTES) {
        const votesIds = voteResultsData.map(v => v.vote_id?.toString());
        votesData = retrieveVotesInfo(WITH_BILLS ? ['bills'] : [''], votesIds);
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
