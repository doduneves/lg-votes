import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Legislative Votes</h1>
      <ul>
        <li>
          <Link href='/bills'>Bills</Link>
        </li>
        <li>
          <Link href='/legislators'>Legislators</Link>
        </li>
      </ul>
    </main>
  );
}
