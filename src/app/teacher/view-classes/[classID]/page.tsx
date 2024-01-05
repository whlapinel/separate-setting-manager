import { getUserID } from "@/lib/authorization";
import UnitContainer from "./(components)/(server components)/unit-container";
import ClassContainer from "./(components)/(server components)/class-container";
import { getTestClassByID, getStudents, getTestEvents } from "@/lib/data";
import type { testClass, student, testEvent } from "@/lib/definitions";
import { redirect } from "next/navigation";

export default async function ClassDetails({ params }) {

    const userID = await getUserID();
    const { classID } = params;


    const testClass: testClass = await getTestClassByID(classID);
    console.log(testClass);

    if (!testClass) {
        redirect("/teacher/view-classes")
    }


    const students: Array<student> = await getStudents(classID);
    console.log("students", students);

    const testEvents: Array<testEvent> = await getTestEvents(classID);
    console.log("testEvents", testEvents);


    return (
        <>
            <ClassContainer testClass={testClass} students={students} testEvents={testEvents} />
        </>
    )
}