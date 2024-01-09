'use client';

import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import Link from "next/link";
import { getStudents, getTestClassByID } from "@/lib/data";
import { getTestEvents, getClasses } from "@/lib/data";
import { testClass, student, testEvent } from "@/lib/definitions";
import AddItemLink from '@/ui/add-item-link';
import AddItemButton from '@/ui/add-item-button';
import { useState } from 'react';
import FormContainer from '@/ui/form-container';
import AddClassForm from '@/app/teacher/add-class/(components)/add-class-form';


export default async function ClassList({ modifiedTestClasses, userID }) {
    const [isAdding, setIsAdding] = useState(false)

    function handleClickAdd(e) {
        setIsAdding(!isAdding);
    }

    return (
        <div>
            <h2 className="text-sm font-medium text-gray-500">My Classes</h2>
            <AddItemButton name='testClasses' handleClickAdd={handleClickAdd} />
            {isAdding ?
                <FormContainer title='Add Class' setIsAdding={handleClickAdd}>
                    <AddClassForm userID={userID} />
                </FormContainer>
                :
                null 
            }
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
                                <p className="text-gray-500">{testClass.studentCount} student{(testClass.studentCount !== 1) ? 's' : null}</p>
                                <p className="text-gray-500">Next Test: {testClass.nextTestDate}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
