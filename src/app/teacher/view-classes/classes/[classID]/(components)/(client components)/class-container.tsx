'use client';

import { testClass, testEvent, student, tableName } from '@/lib/definitions';
import ButtonContainer from '@/ui/button-container';
import { useState } from 'react';
import AddItemButton from '@/ui/add-item-button';
import AddStudentForm from './add-student-form';
import AddTestEventForm from './add-test-event-form';
import FormContainer from '@/ui/form-container';

export default function ClassContainer({ testClass, students, testEvents }: { testClass: testClass, students: Array<student>, testEvents: Array<testEvent> }) {
    const [editingID, setEditingID] = useState(null);
    const [addingType, setAddingType]: [addingType: tableName, setAddingType: Function] = useState(null)

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

    function handleClickAdd(e) {
        console.log(e.target.getAttribute('name'));
        const clickedType = e.target.getAttribute('name');
        setAddingType(clickedType);
    }

    const anyString: string = 'hello';

    function StudentList({ students }: { students: Array<student> }) {

        return (
            <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                {
                    students.map((student) => {
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
                    })
                }
            </ul>
        )
    }

    function TestEventList({ testEvents }: { testEvents: Array<testEvent> }) {

        return (
            <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                {testEvents.map((testEvent) => {
                    return (
                        <li className={`flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6 group/${testEvent.id}`} key={testEvent.id}>
                            <div className="flex w-0 flex-1 items-center">
                                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                    <div className='flex flex-col'>
                                        <span className="truncate font-medium">{testEvent.testName}{' '}</span>
                                        <span className="truncate font-medium">{testEvent.testDate.toDateString()}</span>
                                    </div>
                                </div>
                            </div>
                            <ButtonContainer id={testEvent.id} tableName='testEvents' handleEdit={handleEdit} />
                        </li>
                    )
                })}
            </ul>
        )
    }

    function NoItemList({ name }: { name: string }) {

        return (
            <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                <li className={`flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6`} >
                    <div className="flex w-0 flex-1 items-center">
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                            <span className="truncate font-medium">No {name} assigned</span>
                        </div>
                    </div>
                </li>
            </ul>
        )
    }

    const { block, occurrence, name } = testClass;


    return (
        <div className={`overflow-hidden w-8/12 bg-white shadow sm:rounded-lg`}>
            <div className={`px-4 py-6 sm:px-6`} >
                <div className='flex justify-between'>
                    <h3 className="text-base font-semibold leading-7 text-gray-900">{block}{occurrence}{' '}{name}</h3>
                    <ButtonContainer id={testClass.id} tableName='testClasses' handleEdit={handleEdit} canDelete={students.length === 0 && testEvents.length === 0} />
                </div>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Class details.</p>
            </div>
            <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <div className='flex gap-2 justify-between'>
                            <dt className="text-sm font-medium leading-6 text-gray-900">Students</dt>
                            <AddItemButton name='students' handleClickAdd={handleClickAdd} />
                        </div>
                        <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            {addingType === 'students' ?
                                <FormContainer title="Add Student" setIsAdding={setAddingType}>
                                    <AddStudentForm classID={testClass.id} />
                                </FormContainer>
                                : null
                            }
                            {
                                students.length > 0 ?
                                    <StudentList students={students} />
                                    :
                                    <NoItemList name="students" />
                            }
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <div className='flex gap-2 h-8 justify-between'>
                            <dt className="text-sm font-medium leading-6 text-gray-900">Test Events</dt>
                            <AddItemButton name='testEvents' handleClickAdd={handleClickAdd} />
                        </div>
                        <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            {addingType === 'testEvents' ?
                                <FormContainer title="Add Test Event" setIsAdding={setAddingType}>
                                    <AddTestEventForm classID={testClass.id} />
                                </FormContainer>
                                : null}
                            {
                                testEvents.length > 0 ?
                                    <TestEventList testEvents={testEvents} />
                                    :
                                    <NoItemList name='test events' />
                            }
                        </dd>
                    </div>
                </dl>
            </div >
        </div >
    )
}
