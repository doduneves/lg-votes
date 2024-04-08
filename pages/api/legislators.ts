import type { NextApiRequest, NextApiResponse } from 'next'

import { DataFiles } from "@/utils/enums";
import { parseCSV } from "@/utils/parseCSV";

import { retrieveVoteResultsInfo } from "./results";
import { ILegislator, IVoteResult } from '@/interfaces/interfaces';

export function retrieveLegislatorsInfo(
    fields: string[] = [],
    exclusiveIds: string[] = []
): Array<ILegislator> {
    const WITH_VOTES: boolean = fields.includes('votes');

    let legislatorsData = parseCSV(DataFiles.LEGISLATORS) as Array<ILegislator>;

    if (exclusiveIds.length) {
        legislatorsData = legislatorsData.filter(l => exclusiveIds.includes(l.id.toString()));
    }

    if (!WITH_VOTES) return legislatorsData;

    const voteResultsData: Array<IVoteResult> = retrieveVoteResultsInfo(['votes', 'bills']);

    legislatorsData.forEach(l => {
        l.votes = voteResultsData.filter(res => res.legislator_id == l.id);
        l.supported_bills = l.votes.filter(v => v.vote_type == 1).length;
        l.opposed_bills = l.votes.filter(v => v.vote_type == 2).length;
    })

    return legislatorsData;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(retrieveLegislatorsInfo(['votes']));
}
