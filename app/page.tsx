import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-5xl font-bold pb-4">Legislative Votes</h1>
      <ul>
        <li>
          <Link className='link-secondary' href='/bills'>Bills</Link>
        </li>
        <li>
          <Link className='link-secondary' href='/legislators'>Legislators</Link>
        </li>
      </ul>
    </div>
  );
}
