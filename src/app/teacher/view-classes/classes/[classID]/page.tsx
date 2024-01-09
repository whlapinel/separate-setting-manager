
import ClassContainer from "./(components)/(client components)/class-container";
import { getTestClassByID, getStudents, getTestEvents } from "@/lib/data";
import type { testClass, student, testEvent } from "@/lib/definitions";
import { redirect } from "next/navigation";

export default async function ClassPage({ params }) {

    const {classID} = params 
    const [students, testEvents, testClass] = await Promise.all([getStudents(classID), getTestEvents(classID), getTestClassByID(classID)]);
    
    if (!testClass) {
        redirect("/teacher/view-classes")
    }

    return (
        <ClassContainer testClass={testClass} students={students} testEvents={testEvents} />
        )
}
