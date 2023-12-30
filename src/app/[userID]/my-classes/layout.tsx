import SideNav from "@/app/(components)/side-nav"
import { getUserByID } from "@/lib/data"
import { currentUser } from "@clerk/nextjs";
import { log } from "console";
import { redirect } from "next/navigation";
import checkAuthorization from "@/lib/authorization";

export default async function MyClassesLayout({ children, params }) {
  const { userID } = params;
  const { classID } = params;
  
  const user = await currentUser();
  const dbUser = await getUserByID(userID);

  const requiredRole = "teacher";
  const isAuth: boolean = await checkAuthorization(user, requiredRole);

  if (!dbUser || (!dbUser.roles.includes('admin') && user.id !== userID)) {
    redirect("/not-authorized");
  }

  let options = [
    { name: 'My Classes', url: `/${user.id}/my-classes/`},
    { name: 'Add Class', url: `/${user.id}/my-classes/add-class`}
  ];

  if (classID) {
    options = [
      ...options,
      { name: 'Add Student', url: `/${user.id}/my-classes/${classID}/add-student`, },
      { name: 'Add Test Event', url: `/${user.id}/my-classes/${classID}/add-class`, },
    ]
  }


  return (
    <>
      <div className="flex">
        <SideNav user={dbUser} params={params} options={options}/>
        <div className="flex flex-col items-center m-auto">
          {children}
        </div>
      </div>
    </>
  )
}
