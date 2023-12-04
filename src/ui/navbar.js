import Link from "next/link";


export default function Navbar({params}) {

if (params) {
  const teacher = params.teacher.replace('%20',' ');
}

// My Students and Add Students pages commented out temporarily while 
// I figure out how to establish user Login/Auth. Need to go through home page for now so URLs 
  return (
    <header>
      <h2 className="navbar-heading">Separate Setting Manager</h2>
      <div className="navbar-container">
        <Link href="/">Home</Link>
        <Link href={`/calendar/0`}>Calendar</Link>
        {/* <Link href={`/${teacher}my-students/`}>My Students</Link> */}
        {/* <Link href={`/${teacher}add-student/`}>Add Student</Link> */}
      </div>
    </header>
  );
}
