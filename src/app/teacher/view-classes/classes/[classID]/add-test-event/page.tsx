import AddTestEventForm from "../(components)/(client components)/add-test-event-form"
import { currentUser } from "@clerk/nextjs";
import checkAuthorization from "@/lib/authorization";
import { redirect } from "next/navigation";

export default async function AddTestEvent({params}) {

  const { classID } = params;

  return (
    <div>
        <AddTestEventForm classID={classID} />
    </div>
  )
}
