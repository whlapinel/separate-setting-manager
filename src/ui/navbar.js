import Link from "next/link";

export default function Navbar() {
  return (
    <header>
      <h2 className="navbar-heading">Separate Setting Manager</h2>
      <div className="navbar-container">
        <Link href="/calendar">Calendar</Link>
        <Link href="/my-students">My Students</Link>
      </div>
    </header>
  );
}
