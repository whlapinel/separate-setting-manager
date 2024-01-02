'use client';

import { useFormState } from "react-dom"
import sendRoleApplicationAction from "../(actions)/send-role-application"

const initialState = {
  role: "",
  message: null,
}
export default async function RoleApplicationForm({ userID, pendingRoles }: { userID: string, pendingRoles: string[] }) {
  const [state, formAction] = useFormState(sendRoleApplicationAction, initialState)

  const appliedForTeacher = pendingRoles.includes('teacher');
  const appliedForAdmin = pendingRoles.includes('admin');

  const alreadyAppliedMsg: string = "Your previous application for this role is pending approval."

  return (
    <form action={formAction} className="role-application-form">
      <div className="role-input-container">
        <input type="checkbox" id="teacher" name="teacher" value='teacher' disabled={appliedForTeacher}/>
        <label htmlFor="teacher">Teacher</label>
        {appliedForTeacher && <p>{alreadyAppliedMsg}</p>}
      </div>
      <div className="role-input-container">
        <input type="checkbox" id="admin" name="admin" value='admin' disabled={appliedForAdmin}/>
        <label htmlFor="admin">Admin</label>
        {appliedForAdmin && <p>{alreadyAppliedMsg}</p>}
      </div>
      <div className="role-input-container">
        <input type="hidden" id="id" name="id" value={userID} />
      </div>
      <button type="submit">Submit</button>
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}</p>
    </form>
  )
}


