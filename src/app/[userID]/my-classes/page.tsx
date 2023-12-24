import UnitList from "./(components)/(server components)/unit-list";
import AddClassForm from "./(components)/(client components)/add-class-form";
import { getClasses, getUserByID } from "@/lib/data";
import { log } from "console";
import { testClass } from "@/lib/definitions";
import SideNav from "@/app/(components)/side-nav";
import { get } from "http";
import {auth, currentUser} from "@clerk/nextjs";
import checkAuthorization from "@/lib/authorization";
import { redirect } from "next/navigation";

export default async function MyClasses({ params }) {
  console.log("rendering MyStudents (server component)");
  
  const user = await currentUser();
  const requiredRole = "teacher";
  const isAuth: boolean = await checkAuthorization(user, requiredRole);
  if (!isAuth) {    
    redirect("/not-authorized");
    return null;
  }
  
  const {primaryEmailAddressId} = user;
  const testClasses: Array<testClass> = await getClasses(primaryEmailAddressId);
  console.log("classes", testClasses);

  return (
    <>
      <UnitList testClasses={testClasses} params={params}/>
    </>
  );
}
