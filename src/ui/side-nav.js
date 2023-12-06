import Link from "next/link";

export default function SideNav({ teacher }) {

  return (
    <>
      <div className="side-nav">
        <p>{teacher}</p>
        <Link href={`/${teacher}/my-students`}>My Students</Link>
        <Link href={`/${teacher}/add-student`}>Add Student</Link>
        <Link href={`/${teacher}/add-test-event`}>Add/Remove Test Event</Link>
        <Link href={`/${teacher}/add-class`}>Add/Remove Class</Link>
      </div>
    </>
  );
}
