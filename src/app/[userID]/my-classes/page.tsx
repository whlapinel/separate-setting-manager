import UnitList from "./(components)/(server components)/unit-list";
import AddClassForm from "./(components)/(client components)/add-class-form";
import { getClasses, getUserByID } from "@/lib/data";
import { log } from "console";
import { testClass } from "@/lib/definitions";
import SideNav from "@/app/(components)/side-nav";
import { get } from "http";

export default async function MyStudents({ params }) {
  console.log("rendering MyStudents (server component)");

  const { userID } = params;

  const testClasses: Array<testClass> = await getClasses(userID);
  console.log("classes", testClasses);

  return (
    <>
      <UnitList testClasses={testClasses} params={params}/>
    </>
  );
}
