import React from 'react'

import { HomeLink } from '../components/HomeLink';
import { IBill } from '@/interfaces/interfaces';

const fetchBills = async () => {
    const res = await fetch('http://localhost:3000/api/bills')
    const data = await res.json();
    return data;
}

const BillsPage = async () => {
    const bills = await fetchBills();

    return (
        <>
            <h1 className="text-5xl font-bold pb-4">Bills</h1>
            <table className='table table-sm table-zebra'>
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
                        bills.map((b: IBill) =>
                            <tr className='hover' key={b.id}>
                                <td>{b.id}</td>
                                <td>{b.title}</td>
                                <td>{b.votes?.supporters?.length}</td>
                                <td>{b.votes?.opposers?.length}</td>
                                <td>{b.sponsor?.name}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <HomeLink />
        </>

    )
}

export default BillsPage