import AddTestEventForm from "../(components)/(client components)/add-test-event-form"
import { currentUser } from "@clerk/nextjs";
import checkAuthorization from "@/lib/authorization";
import { redirect } from "next/navigation";

export default async function AddTestEvent({params}) {
  const user = await currentUser();
  const requiredRole = "teacher";
  const isAuth: boolean = await checkAuthorization(user, requiredRole);
  if (!isAuth) {    
    redirect("/not-authorized");
    return null;
  }

  const { userID } = params;
  const { classID } = params;

  
  return (
    <div>
        <AddTestEventForm classID={classID} userID={userID}/>
    </div>
  )
}
