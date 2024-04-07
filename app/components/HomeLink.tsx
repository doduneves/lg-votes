import Link from "next/link"

export const HomeLink = async () => {
    return (
        <div className="pt-3">
            <Link className='link-primary' href='/'>Back</Link>
        </div>
    )
}
