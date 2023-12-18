
import { testEvent } from "@/lib/definitions";

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
            className={"row-container"}
          >
            <div>
              <p>{testEvent.testName}</p>
              <p>{testEvent.testDate.toDateString()}</p>
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
