import SideNav from "@/app/(components)/side-nav"
import { getUserByID } from "@/lib/data"
import { currentUser } from "@clerk/nextjs";
import { log } from "console";
import { redirect } from "next/navigation";
import checkAuthorization from "@/lib/authorization";
import ProtectPage from "@/lib/authorization";
import NotAuthorizedPage from "@/app/not-authorized/page";

export default async function CalendarLayout({ children, params }) {

  const isAuth = ProtectPage("teacher");

  return (
    <>
      {!isAuth ?
        <NotAuthorizedPage /> :
        <div className="flex flex-col items-center">
          {children}
        </div>
      }
    </>
  )
}
