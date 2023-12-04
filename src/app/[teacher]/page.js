import SideNav from "@/ui/side-nav";
import Link from "next/link";

export default function TeacherPage({ params }) {
  let { teacher } = params;
  teacher = teacher.replace("%20", " ");
  console.log(teacher);

  return (
    <>
      <p>this will be the teacher's dashboard page</p>
    </>
  );
}
