'use client';

import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { useState } from "react";
import { useFormState } from "react-dom";
import clsx from "clsx";
import { Select } from "@/ui/select";
import { testRoom, status } from "@/lib/definitions";
import { addTestRoom } from '../(actions)/add-test-room'
import { SubmitButton } from "@/ui/submit-button";

const initialState: Partial<testRoom> | { message: status } = {
    roomNumber: null,
    roomDescription: null,
    message: null,
}


export default function AddTestingRoomForm({ testRooms }) {
    const [isHidden, setIsHidden] = useState(true);
    const [formData, formAction] = useFormState(addTestRoom, initialState)

    function toggleHidden() {
        setIsHidden(!isHidden);
    }

    return (
        <>
            <Button className="self-center" onClick={toggleHidden}>Add Testing Room</Button>
            <form action={formAction}>
                <div className={isHidden ? "hidden" : 'px-4 sm:px-6 lg:px-8 my-8'}>
                    <div className=" grid grid-cols-3 gap-3 m-1">
                    <label htmlFor="roomNumber">Room Number</label>
                    <label htmlFor="roomDescription">Room Description</label>
                    <Input type="text" id="roomNumber" name="roomNumber" placeholder="e.g. CA-3" />
                    <Input type="text" id="roomDescription" name="roomDescription" placeholder="e.g. broom closet, last resort" />
                    <SubmitButton />
                    </div>
                </div >
            </form>

        </>
    )
}