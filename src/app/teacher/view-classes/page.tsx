import { getClasses, getStudents, getTestEvents } from "@/lib/data";
import { testClass, testEvent, student } from "@/lib/definitions";
import ClassList from "@/app/teacher/view-classes/(components)/(server components)/class-list"
import { currentUser } from "@clerk/nextjs";


export default async function ViewClasses() {
  console.log("rendering ViewClasses (server component)");
  
  const userID = (await currentUser()).primaryEmailAddressId;
  const testClasses: Array<testClass> = await getClasses(userID);
  console.log("classes", testClasses);

  async function getStudentsLength(classID: string): Promise<number> {
      const students: Array<student> = await getStudents(classID);
      console.log("students", students);
      const studentCount: number = students.length;
      return studentCount;
  }

  async function getNextTestDateString(classID: string): Promise<string> {
      const testEvents: Array<testEvent> = await getTestEvents(classID);
      console.log("testEvents", testEvents);
      const nextTestEvent: testEvent = testEvents[0];
      const nextTestDate: string = nextTestEvent? nextTestEvent.testDate.toDateString() : "no tests scheduled";
      return nextTestDate;
  }

  const modifiedTestClasses = await Promise.all(testClasses.map(async (testClass) => {

    return (
        {
            ...testClass,
            nextTestDate: await getNextTestDateString(testClass.id),
            studentCount: await getStudentsLength(testClass.id),
            href: `/teacher/view-classes/classes/${testClass.id}`
        }
    )
}))



  return (
    <>
      <ClassList modifiedTestClasses={modifiedTestClasses} userID={userID}/>
    </>
  );
}
