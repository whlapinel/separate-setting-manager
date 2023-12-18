import AddTestEventForm from "../(components)/add-test-event-form"

export default function AddTestEvent({params}) {

    const testClass = params.classID;
  return (
    <div>
        <AddTestEventForm testClass={testClass}/>
    </div>
  )
}
