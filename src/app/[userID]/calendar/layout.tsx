import SideNav from "@/app/(components)/side-nav"
import { getUserByID } from "@/lib/data"
import { currentUser } from "@clerk/nextjs";
import { log } from "console";
import { redirect } from "next/navigation";
import checkAuthorization from "@/lib/authorization";

export default async function CalendarLayout({ children, params }) {

  console.log("params: " + params.userID);
  
  const { userID } = params;
  const { classID } = params;
  
  const user = await currentUser();
  const dbUser = await getUserByID(userID);

  const requiredRole = "teacher";
  const isAuth: boolean = await checkAuthorization(user, requiredRole, userID);

  if (!isAuth) {
    redirect("/not-authorized");
    return null;
  }
  return (
    <>
        <div className="flex flex-col items-center">
          {children}
        </div>
    </>
  )
}
