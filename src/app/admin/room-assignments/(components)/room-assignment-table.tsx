'use client';

import { roomAssignment } from "@/lib/definitions";
import { Button } from "@/ui/button";
import AddTestIntervalForm from "./add-room-assignment-form";
import AddItemButton from "@/ui/add-item-button";
import FormContainer from "@/ui/form-container";
import { useState } from "react";

export default function RoomAssignmentsTable({ desig, roomAssignments, testRooms }) {
    const [isAdding, setIsAdding] = useState(false);

    const descriptions = {
        primary: 'Primary Test Interval',
        secondary: 'Secondary Test Interval',
        tertiary: 'Tertiary Test Interval',
        'one-to-one': '1:1 Test Interval',
    }

    function handleClickAdd() {
        console.log('add clicked');
        setIsAdding(!isAdding);
        console.log(isAdding);   
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8 my-8" >
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">{desig}</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        {descriptions[desig]}
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        Room Number
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Start Date
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        End Date
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {roomAssignments?.map((assignment: roomAssignment) => (
                                    <tr key={assignment.endDate.toDateString()}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                            {assignment.roomNumber}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{assignment.startDate.toDateString()}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{assignment.endDate.toDateString()}</td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                            <Button>
                                                Edit
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <AddItemButton name="roomAssignments" handleClickAdd={handleClickAdd} />
                        { isAdding? 
                        <FormContainer title='Add Room Assignment' setIsAdding={setIsAdding}>
                            <AddTestIntervalForm desig={desig} testRooms={testRooms} />
                        </FormContainer>
                        : null }
                    </div>
                </div>
            </div>
        </div>
    )
}
