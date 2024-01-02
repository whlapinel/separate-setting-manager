import ProtectTeacherPages from "./(components)/protect-teacher-pages";
import { currentUser } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/dist/types/server";
import type { user } from "@/lib/definitions";
import { getUserByID } from "@/lib/data";
import ProtectPage from "@/lib/authorization";

export default async function TeacherLayout({ children }) {

  const isAuth: boolean = await ProtectPage("teacher");

  if (!isAuth) {
      return (<p>You do not have the teacher role</p>)
  }

  // otherwise render children


  return (
      <>
          {children}
      </>
  )
}
