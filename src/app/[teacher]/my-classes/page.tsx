import UnitList from "./(components)/unit-list";
import AddClassForm from "./(components)/add-class-form";
import { getClasses } from "@/lib/data";
import { log } from "console";
import { testClass } from "@/lib/definitions";

export default async function MyStudents({ searchParams, params }) {
  console.log("rerendering MyStudents (server component)");

  const userID = searchParams.teacher;
  log("userID", userID);


  const testClasses: Array<testClass> = await getClasses(userID);
  console.log("classes", testClasses);

  const teacherNameString = `${params.teacher.replace("-", " ")}`;

    return (
      <>
      <AddClassForm userID={userID} teacherNameString={teacherNameString}/>
        <UnitList testClasses={testClasses} userID={userID}/>
      </>
    );
  }
