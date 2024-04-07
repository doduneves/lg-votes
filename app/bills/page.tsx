import React from 'react'
import { ILegislator } from '../legislators/page';

interface IVotes {
    id: number,
    legislator_id: number,
    vote_id: number,
    vote_type: number,
}

interface IBills {
    id: number,
    title: string,
    votes: Array<IVotes>,
    sponsor: ILegislator,
}

const fetchBills = async () => {
    const res = await fetch('http://localhost:3000/api/bills')
    const data = await res.json();
    return data;
}

const BillsPage = async () => {
    const bills = await fetchBills();

    return (
        <>
            <h1>Bills</h1>
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Bill</td>
                        <td>Supporters</td>
                        <td>Opposers</td>
                        <td>Primary Sponsor</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        bills.map((b: IBills) =>
                            <tr key={b.id}>
                                <td>{b.id}</td>
                                <td>{b.title}</td>
                                <td>{b.votes.supporters.length}</td>
                                <td>{b.votes.opposers.length}</td>
                                <td>{b.sponsor.name}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>

    )
}

export default BillsPage