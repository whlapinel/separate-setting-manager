import AddClassForm from "../(components)/(client components)/add-class-form";
import { currentUser } from "@clerk/nextjs";
import checkAuthorization from "@/lib/authorization";
import { redirect } from "next/navigation";

export default async function AddClass({params}) {
  const user = await currentUser();
  const requiredRole = "teacher";
  const isAuth: boolean = await checkAuthorization(user, requiredRole);
  if (!isAuth) {    
    redirect("/not-authorized");
    return null;
  }


  const {primaryEmailAddressId} = user;
  const userID = primaryEmailAddressId

    
  return (
    <div>
        <AddClassForm userID={userID}/>
    </div>
  )
}
