import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

const userID = "test";

export default function Navbar() {

  return (
    <>
      <div className="navbar-top-line">
      <h2 className="navbar-heading bg-orange-700">Separate Setting Manager</h2>
        <UserButton />
      </div>
      <div className="navbar-container">
        <Link href="/">Home</Link>
        <Link href={`/calendar/0`}>Calendar</Link>
        <Link href={`/${userID}/admin`}>Admin</Link>
      </div>
    </>
  );
}
