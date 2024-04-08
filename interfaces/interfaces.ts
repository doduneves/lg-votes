export interface IBill {
    id: number,
    title: string,
    sponsor_id: number,
    votes: IVotesTypes,
    sponsor: ILegislator,
}

export interface ILegislator {
    id: number,
    name: string,
    votes: Array<IVoteResult>
    supported_bills: number,
    opposed_bills: number,
}

export interface IVote {
    id: number,
    bill_id: number,
    bill: IBill,
}

export interface IVoteResult {
    id: number,
    legislator_id: number,
    vote_id: number,
    vote_type: number,
    vote: IVote,
    legislator: ILegislator,
}

export interface IVotesTypes {
    supporters: IVoteResult[]
    opposers: IVoteResult[]
}
