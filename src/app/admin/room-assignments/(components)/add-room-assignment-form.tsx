'use client';

import { useState } from 'react';
import { Input } from "@/ui/input"
import { Button } from '@/ui/button';
import { useFormState } from 'react-dom';
import { addRoomAssignmentAction } from '../(actions)/add-room-assignment';
import { roomAssignment, testRoom } from '@/lib/definitions';
import { status } from '@/lib/definitions';
import { SubmitButton } from '@/ui/submit-button';
import { Select } from '@/ui/select';
import { Label } from '@/ui/fieldset';
import FormContainer from '@/ui/form-container';

const initialState: Partial<roomAssignment> | { message: status } = {
    roomNumber: null,
    startDate: null,
    endDate: null,
    desig: null,
    message: null,
}

export default function AddTestIntervalForm({ desig, testRooms }: { desig: roomAssignment['desig'], testRooms: Array<testRoom> }) {
    const [isAdding, setIsAdding] = useState(true);
    const [formData, formAction] = useFormState(addRoomAssignmentAction, initialState);

    function toggleHidden() {
        setIsAdding(!isAdding);
    }

    return (
            <form action={formAction}>
                <div className='grid grid-cols-4 gap-3 m-1'>
                    <label htmlFor='roomNumber'>Room Number</label>
                    <label htmlFor='startDate'>Start Date</label>
                    <label htmlFor='startDate'>End Date</label>
                    <div></div>
                    <select id="roomNumber" name="roomNumber" className=' border rounded-lg'>
                        {
                            testRooms.map((testRoom: testRoom) => {
                                return (<option key={testRoom.roomNumber}>{testRoom.roomNumber}</option>)
                            })
                        }
                    </select>
                    <input type="date" name='startDate' className=' border rounded-lg' />
                    <input type="date" name='endDate' className=' border rounded-lg' />
                    <SubmitButton />
                    <Input type="hidden" name='desig' value={desig} />
                </div>
            </form>
    )
}