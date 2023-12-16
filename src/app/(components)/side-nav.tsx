import Link from "next/link";

export default function SideNav({ teacher }) {

  return (
    <>
      <div className="side-nav">
        <p>{teacher}</p>
        <Link href={`/${teacher}/my-classes`}>My Classes</Link>
        <Link href={`/${teacher}/add-class`}>Add Class</Link>
        <Link href={`/${teacher}/add-student`}>Add Student</Link>
        <Link href={`/${teacher}/add-test-event`}>Add Test Event</Link>
      </div>
    </>
  );
}
