'use client';

import { useFormState } from "react-dom"
import sendRoleApplicationAction from "../(actions)/send-role-application"
import { SubmitButton } from "@/ui/submit-button";
import { role } from "@/lib/definitions";
import React from "react";

const initialState = {
    role: "",
    message: null,
}
export default async function RoleApplicationForm({ userID, pendingRoles, roles }: { userID: string, pendingRoles: string[], roles: string[] }) {
    const [state, formAction] = useFormState(sendRoleApplicationAction, initialState)

    const availRoles: Array<role> = ['teacher', 'admin'];
    const roleElements: React.ReactNode = availRoles.map((role: string) => {
        const hasRole = roles.includes(role);
        const alreadyApplied = pendingRoles.includes(role);
        let msg: string;
        if (hasRole) {
            msg = "You already have this role."
        } else if (alreadyApplied) {
            msg = "You already applied for this role."
        }

        return (
            <div className="flex gap-2 group" key={role}>
                <input type="checkbox" id={role} name={role} value={role} disabled={alreadyApplied || hasRole} />
                <label htmlFor="teacher">{`${role.charAt(0).toUpperCase()}${role.slice(1)}`}</label>
                    <p className="invisible group-hover:visible">{msg}</p>
            </div>
        )
    })

    return (
        <form action={formAction} className="role-application-form">
            {roleElements}
            <div className="role-input-container">
                <input type="hidden" id="id" name="id" value={userID} />
            </div>
            <SubmitButton>Submit</SubmitButton>
            <p aria-live="polite" className="sr-only" role="status">
                {state?.message}</p>
        </form >
    )
}


