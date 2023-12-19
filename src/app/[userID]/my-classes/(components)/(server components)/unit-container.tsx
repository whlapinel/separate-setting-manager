
import TestEventList from "./test-event-list";
import StudentList from "./student-list";
import Link from "next/link";
import { getStudents } from "@/lib/data";
import { getTestEvents } from "@/lib/data";
import { testClass, student, testEvent } from "@/lib/definitions";
import DeleteItemForm from "../(client components)/delete-item-form";


export default async function UnitContainer({ testClass, params }: { testClass: testClass, params: any }) {
  console.log("rendering UnitContainer (client component)");

  const { id, name, block, occurrence, teacher } = testClass;

  const students: Array<student> = await getStudents(id);
  console.log("students", students);

  const testEvents: Array<testEvent> = await getTestEvents(id);
  console.log("testEvents", testEvents);

  const { userID } = params;

  return (
    <div
      className={"unit-container"}
      id={testClass.id}
    >
      <div>
        <div>
        <DeleteItemForm id={id} tableName={'testClasses'} />
    <Link href={`/${userID}/my-classes/${id}/edit-class`}>Edit Class
        </Link>
        </div>
        <h3>{block}{occurrence}{'  '}{name}</h3>
      </div>
      <Link href={`/${userID}/my-classes/${id}/add-student`}>
        Add Student + </Link>
        <h4>Students</h4>
      <StudentList
        students={students}
      />
      <Link href={`/${userID}/my-classes/${id}/add-test-event`}>
        Add Test Event + </Link>
      <h4>Test Events</h4>
      <TestEventList
        testEvents={testEvents}
      />
    </div>
  );
}
