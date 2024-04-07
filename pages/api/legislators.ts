import { DataFiles } from "@/utils/enums";
import { parseCSV } from "@/utils/parseCSV";

import type { NextApiRequest, NextApiResponse } from 'next'
import { retrieveVoteResultsInfo } from "./results";

export function retrieveLegislatorsInfo(fields: string[] = []) {
    const WITH_VOTES: boolean = fields.includes('votes');

    const legislatorsData: any[] = parseCSV(DataFiles.LEGISLATORS);

    if (!WITH_VOTES) return legislatorsData;

    const deepResultsData = retrieveVoteResultsInfo(['votes', 'bills']);

    const legistorsWithVotes: any[] = [];

    legislatorsData.forEach(l => {
        const votes = deepResultsData.filter(res => res.legislator_id == l.id);

        legistorsWithVotes.push({
            ...l,
            votes,
            supported_bills: votes.filter(v => v.vote_type == '1').length,
            opposed_bills: votes.filter(v => v.vote_type == '2').length,
        })
    })

    return legistorsWithVotes;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(retrieveLegislatorsInfo(['votes']));
}
