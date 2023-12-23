import AddClassForm from "../(components)/(client components)/add-class-form";
import { currentUser } from "@clerk/nextjs";

export default async function AddClass({params}) {

  const user = await currentUser();

  const {primaryEmailAddressId} = user;
  const userID = primaryEmailAddressId

    
  return (
    <div>
        <AddClassForm userID={userID}/>
    </div>
  )
}
