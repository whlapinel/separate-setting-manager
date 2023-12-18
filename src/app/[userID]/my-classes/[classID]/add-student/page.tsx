import AddStudentForm from "../(components)/add-student-form";
import { getTestClassByID } from "@/lib/data";

export default function AddStudent({params}) {

    // get the testClass object from the database
    const testClassID = params.classID;
    const testClass = getTestClassByID(testClassID);
    

  return (
    <div>
        <AddStudentForm testClass={testClass}/>
    </div>
  )
}
