import SideNav from "@/app/(components)/side-nav"
import { getUserByID } from "@/lib/data"
import { log } from "console";



export default async function MyClassesLayout({children, params}) {
    const { userID } = params;
    const { classID } = params;

    const user = await getUserByID(userID);


    return (
        <>
        <div className="teacher-dashboard">
          <SideNav user={user} params={params}/>
          <div className="teacher-dashboard-main">
            {children}
          </div>
        </div>
      </>
      )
}
