import AddStudentForm from "../(components)/(client components)/add-student-form";
import { getTestClassByID } from "@/lib/data";

export default async function AddStudent({ params }) {

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
