import Link from "next/link";

export default function SideNav({ teacher }) {

  return (
    <>
      <div className="side-nav">
        <p>{teacher}</p>
        <Link href={`/${teacher}/my-classes`}>My Classes</Link>
      </div>
    </>
  );
}
