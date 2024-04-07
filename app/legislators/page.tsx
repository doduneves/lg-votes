import React from 'react'

interface ILegislator {
    id: number,
    name: string,
    supported_bills: number,
    opposed_bills: number,
}
const fetchLegislators = async () => {
    const res = await fetch('http://localhost:3000/api/legislators')
    const data = await res.json();
    return data;
}

const LegislatorsPage = async () => {
    const users = await fetchLegislators();

    return (
        <>
            <h1>Legislators</h1>
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Legislator</td>
                        <td>Supported Bills</td>
                        <td>Opposed Bills</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((l: ILegislator) =>
                            <tr key={l.id}>
                                <td>{l.id}</td>
                                <td>{l.name}</td>
                                <td>{l.supported_bills}</td>
                                <td>{l.opposed_bills}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>

    )
}

export default LegislatorsPage