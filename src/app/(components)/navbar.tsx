import Link from "next/link";
import { UserButton } from "@clerk/nextjs";


export default function Navbar() {

  

  return (
    <>
      <div className="navbar-top-line">
      <h2 className="navbar-heading">Separate Setting Manager</h2>
        <UserButton />
      </div>
      <div className="navbar-container">
        <Link href="/">Home</Link>
        <Link href={`/calendar/0`}>Calendar</Link>
      </div>
    </>
  );
}
