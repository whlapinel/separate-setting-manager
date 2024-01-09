import AddStudentForm from "../(components)/(client components)/add-student-form";
import { getTestClassByID } from "@/lib/data";
import { currentUser } from "@clerk/nextjs";
import checkAuthorization, { getUserID } from "@/lib/authorization";
import { redirect } from "next/navigation";

export default async function AddStudent({ params }) {

  const {classID} = params

  return (
    <div>
      <AddStudentForm classID={classID}/>
    </div>
  )
}
