import { getClasses } from "@/lib/data";
import { testClass } from "@/lib/definitions";
import ClassList from "@/app/teacher/view-classes/(components)/(server components)/class-list"
import { currentUser } from "@clerk/nextjs";

export default async function ViewClasses() {
  console.log("rendering ViewClasses (server component)");
  
  const userID = (await currentUser()).primaryEmailAddressId;
  const testClasses: Array<testClass> = await getClasses(userID);
  console.log("classes", testClasses);

  return (
    <>
      <ClassList userID={userID}/>
    </>
  );
}
