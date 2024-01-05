import ProtectPage from "@/lib/authorization";
import { Redirect } from "next";
import { redirect } from "next/navigation";
import SideNav from "../(components)/side-nav";
import type { option } from "@/lib/definitions";

export default async function TeacherLayout({ children }) {


  const isAuth: boolean = await ProtectPage("teacher");

  if (!isAuth) {
    redirect("/not-authorized");
  }

  // otherwise render children

  const teacherOptions: Array<option> = [
    { name: 'Teacher Home', url: `/teacher/` },
    { name: 'View Classes', url: `/teacher/view-classes` },
    { name: 'Add Class', url: `/teacher/add-class` },
    { name: 'Calendar', url: `/teacher/calendar/0` },
  ];

  return (
    <>
      <SideNav options={teacherOptions} />
      <div className="flex flex-col items-center">
        {children}
      </div>

    </>
  )
}
