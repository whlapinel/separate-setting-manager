import AddTestEventForm from "../(components)/(client components)/add-test-event-form"

export default function AddTestEvent({params}) {
  const { userID } = params;
  const { classID } = params;

  
  return (
    <div>
        <AddTestEventForm classID={classID} userID={userID}/>
    </div>
  )
}
