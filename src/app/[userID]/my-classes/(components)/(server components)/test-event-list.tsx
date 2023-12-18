
import { testEvent } from "@/lib/definitions";
import DeleteItemForm from "../(client components)/delete-item-form";

export default function TestEventList({testEvents}: {testEvents: Array<testEvent>}) {
  console.log("rendering TestEventList (server component)");

  console.log("testEvents", testEvents);

  

  const testEventElements = !testEvents ? (
    <p>no events</p>
  ) : (
    testEvents.map((testEvent) => {
      return (
          <div
            id={testEvent.id}
            key={testEvent.id}
            className={"row-container"}
          >
            <DeleteItemForm id={testEvent.id} tableName={'testEvents'}/>
            <div>
              <p><span>{testEvent.testName}</span>
              <span> -- </span>
              <span>{testEvent.testDate.toDateString()}</span></p>
            </div>
          </div>
      );
    })
  );

  return (
    <>
      <div className="test-event-container">{testEventElements}</div>
    </>
  );
}
