'use client';

import { Client } from "pg";
import { roomAssignment } from "@/lib/definitions";
import { Button } from "@/ui/button";
import { useState } from "react";
import { Input } from "@/ui/input";
import AddTestIntervalForm from "./add-room-assignment-form";

export default async function RoomAssignmentsTable({ desig, desigDescription, intervals, testRooms }) {


    return (
        <div className="px-4 sm:px-6 lg:px-8 my-8" >
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">{desig}</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        {desigDescription}
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
                                {intervals.map((interval: roomAssignment) => (
                                    <tr key={interval.endDate.toDateString()}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                            {interval.roomNumber}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{interval.startDate.toDateString()}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{interval.endDate.toDateString()}</td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                            <Button>
                                                Edit
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <AddTestIntervalForm desig={desig} testRooms={testRooms}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
