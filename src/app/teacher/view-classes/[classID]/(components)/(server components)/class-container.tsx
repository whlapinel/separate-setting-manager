'use client';

import { testClass, testEvent, student } from '@/lib/definitions';
import { getTestClassByID, getStudents, getTestEvents } from '@/lib/data';
import { Link } from '@/ui/link';
import DeleteItemForm from '../(client components)/delete-item-form';
import EditButton from '../../../../../../ui/edit-button';
import ButtonContainer from '@/ui/button-container';
import { useState } from 'react';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';

export default function ClassContainer({ testClass, students, testEvents }: { testClass: testClass, students: Array<student>, testEvents: Array<testEvent> }) {
    const [editingID, setEditingID] = useState(null);

    function handleEdit(e) {
        console.log("edit clicked");
        console.log("id: ", e.target.closest('button').id);
        const buttonID = e.target.closest('button').id;
        if (editingID === buttonID) {
            setEditingID(null);
        } else {
            setEditingID(buttonID)
        }
    }

    const anyString: string = 'hello';

    return (
        <div className={`overflow-hidden bg-white shadow sm:rounded-lg`}>
            <div className={`px-4 py-6 sm:px-6`} >
                <div className='flex justify-between'>
                    <h3 className="text-base font-semibold leading-7 text-gray-900">Class Information</h3>
                    <ButtonContainer id={testClass.id} tableName='testClasses' handleEdit={handleEdit} canDelete={students.length === 0 && testEvents.length === 0} />
                </div>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Class details.</p>
            </div>
            <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Block and Occurrence</dt>
                        {
                            editingID === testClass.id ?
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"><Input /></dd>
                                :
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{testClass.block}{testClass.occurrence}</dd>
                        }
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Class Name</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{testClass.name}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <div className='flex gap-2 justify-between'>
                            <dt className="text-sm font-medium leading-6 text-gray-900">Students</dt>
                            <Button color='blue' className={'h-8'}>+</Button>
                        </div>
                        <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                {students.map((student) => {
                                    return (
                                        <li className={`flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6`} key={student.id}>
                                            <div className="flex w-0 flex-1 items-center">
                                                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                    <span className="truncate font-medium">{student.firstName}{' '}{student.lastName}</span>
                                                </div>
                                            </div>
                                            <ButtonContainer id={student.id} tableName='students' handleEdit={handleEdit} />
                                        </li>
                                    )
                                })}
                            </ul>
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <div className='flex gap-2 h-8 justify-between'>
                            <dt className="text-sm font-medium leading-6 text-gray-900">Test Events</dt>
                            <Button color='blue'>+</Button>
                        </div>
                        <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                {testEvents.map((testEvent) => {
                                    return (
                                        <li className={`flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6 group/${testEvent.id}`} key={testEvent.id}>
                                            <div className="flex w-0 flex-1 items-center">
                                                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                    <div className='flex flex-col'>
                                                        <span className="truncate font-medium">Name: {testEvent.testName}{' '}</span>
                                                        <span className="truncate font-medium">Date: {testEvent.testDate.toDateString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <ButtonContainer id={testEvent.id} tableName='testEvents' handleEdit={handleEdit} />
                                        </li>
                                    )
                                })}
                            </ul>
                        </dd>
                    </div>
                </dl>
            </div >
        </div >
    )
}
