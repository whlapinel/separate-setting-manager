import AddStudentForm from "../(components)/(client components)/add-student-form";
import { getTestClassByID } from "@/lib/data";
import { currentUser } from "@clerk/nextjs";
import checkAuthorization from "@/lib/authorization";
import { redirect } from "next/navigation";

export default async function AddStudent({ params }) {
  const user = await currentUser();
  const requiredRole = "teacher";
  const isAuth: boolean = await checkAuthorization(user, requiredRole);
  if (!isAuth) {    
    redirect("/not-authorized");
    return null;
  }

  // get the testClass object from the database
  const testClassID = params.classID;
  const { userID } = params;
  const testClass = await getTestClassByID(testClassID);


  return (
    <div>
      <AddStudentForm testClass={testClass} userID={userID} />
    </div>
  )
}
