
import TestEventList from "./test-event-list";
import StudentList from "../(client components)/student-list";
import Link from "next/link";
import { getStudents, getTestClassByID } from "@/lib/data";
import { getTestEvents } from "@/lib/data";
import { testClass, student, testEvent } from "@/lib/definitions";
import DeleteItemForm from "../(client components)/delete-item-form";


export default async function UnitContainer({ classID, userID }: { classID: string, userID: string }) {
  console.log("rendering UnitContainer (client component)");

  const testClass: testClass = await getTestClassByID(classID);
  console.log(testClass);

  const {name, block, occurrence} = testClass;
  
  const students: Array<student> = await getStudents(classID);
  console.log("students", students);

  const testEvents: Array<testEvent> = await getTestEvents(classID);
  console.log("testEvents", testEvents);


  return (
    <div>
      <div>
        <div>
          <DeleteItemForm id={classID} tableName={'testClasses'} />
          <Link href={`/teacher/view-classes/${classID}/edit-class`}>Edit Class
          </Link>
        </div>
        <h3>{block}{occurrence}{'  '}{name}</h3>
      </div>
      <Link href={`/teacher/view-classes/${classID}/add-student`}>
        Add Student + </Link>
      <h4>Students</h4>
      <StudentList
        students={students}
      />
      <Link href={`/teacher/view-classes/${classID}/add-test-event`}>
        Add Test Event + </Link>
      <h4>Test Events</h4>
      <TestEventList
        testEvents={testEvents}
      />
    </div>
  );
}
