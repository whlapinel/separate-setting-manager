'use client'

import processApplication from "../(actions)/process-application"
import type { role } from "@/lib/definitions";
import type { user } from "@/lib/definitions";
import SubmitButton from "./submit-button";
import { useFormState } from "react-dom";
import { Fragment } from "react";

const initialState = {
    message: '',
}

export default function AdjudicationForm({ user }: { user: user }) {
    const [state, formAction] = useFormState(processApplication, initialState)

    const userNameString = `${user.firstName} ${user.lastName}`;

    return (
        <>
            {user.pendingRoles?.map((role: role) => {
                return (
                    <Fragment key={user.id}>
                        <form action={formAction}>
                            <fieldset className="application-fieldset">
                                <legend>{userNameString}</legend>
                                <span>Approve </span>
                                <span>Disapprove </span>
                                <span>Role </span>
                                <input type="radio" id={user.id} name={role} value={'approve'} />
                                <input type="radio" id={user.id} name={role} value={'disapprove'} />
                                <input type="hidden" id={user.id} name="id" value={user.id} />
                                <input type="hidden" id={user.id} name="role" value={role} />
                                <li className="application-role-list">
                                    {role}
                                </li>
                            </fieldset>
                        <SubmitButton />
                        </form>
                    </Fragment>
                )
            }
            )}
        </>
    )
}