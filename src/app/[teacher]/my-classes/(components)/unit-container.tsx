
import TestEventList from "./test-event-list";
import StudentList from "./student-list";
import { getStudents } from "@/lib/data";
import { getTestEvents } from "@/lib/data";
import { testClass, student, testEvent } from "@/lib/definitions";
import DeleteClassForm from "./delete-class-form";


export default async function UnitContainer({testClass}: {testClass: testClass}) {
  console.log("rendering UnitContainer (client component)");

  const students: Array<student> = await getStudents(testClass.id);
  console.log("students", students);

  const testEvents: Array<testEvent> = await getTestEvents(testClass.id);
  console.log("testEvents", testEvents);

  return (
    <div
      className={"unit-container"}
      key={testClass.id}
      id={testClass.id}
    >
      <div>
        <DeleteClassForm id={testClass.id}/>
      <h3>{testClass.name}</h3>
      </div>
      <StudentList
        students={students}
      />
      <h4>Test Events</h4>
      <TestEventList
        testEvents={testEvents}
      />
    </div>
  );
}
