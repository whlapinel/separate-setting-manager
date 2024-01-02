import AddClassForm from "./(components)/add-class-form";
import { currentUser } from "@clerk/nextjs";
import checkAuthorization from "@/lib/authorization";
import { redirect } from "next/navigation";

export default async function AddClass() {
  const user = await currentUser();

  const {primaryEmailAddressId} = user;
  const userID = primaryEmailAddressId
    
  return (
        <AddClassForm userID={userID}/>
  )
}
