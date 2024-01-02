import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import Link from "next/link";
import { getStudents, getTestClassByID } from "@/lib/data";
import { getTestEvents, getClasses } from "@/lib/data";
import { testClass, student, testEvent } from "@/lib/definitions";

export default async function ClassList({ userID }: { userID: string }) {

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
        const nextTestDate: string = nextTestEvent.testDate.toDateString();
        return nextTestDate;
    }

    const modifiedTestClasses = await Promise.all(testClasses.map(async (testClass) => {


        return (
            {
                ...testClass,
                nextTestDate: await getNextTestDateString(testClass.id),
                studentCount: await getStudentsLength(testClass.id),
                href: `/teacher/view-classes/${testClass.id}`
            }
        )
    }))

    return (
        <div>
            <h2 className="text-sm font-medium text-gray-500">My Classes</h2>
            <ul role="list" className="mt-3 grid grid-cols-1 gap-5">
                {modifiedTestClasses.map((testClass) => (
                    <li key={testClass.id} className="col-span-1 flex rounded-md shadow-sm">
                        <div
                            className={
                                'bg-red-600 flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white'
                            }
                        >
                            {testClass.block} {testClass.occurrence}
                        </div>
                        <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
                            <div className="flex-1 truncate px-4 py-2 text-sm">
                                <Link href={testClass.href} className="font-medium text-gray-900 hover:text-gray-600">
                                    {testClass.name}
                                </Link>
                                <p className="text-gray-500">{testClass.studentCount} student {(testClass.studentCount > 1)?'s':null}</p>
                                <p className="text-gray-500">Next Test: {testClass.nextTestDate}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
