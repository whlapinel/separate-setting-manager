import Link from "next/link";


export default function Navbar() {

  return (
    <>
      <h2 className="navbar-heading">Separate Setting Manager</h2>
      <div className="navbar-container">
        <Link href="/">Home</Link>
        <Link href={`/calendar/0`}>Calendar</Link>
      </div>
    </>
  );
}
