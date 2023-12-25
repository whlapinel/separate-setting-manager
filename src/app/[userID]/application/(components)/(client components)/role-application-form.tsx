'use client';

import { useFormState } from "react-dom"
import sendRoleApplicationAction from "../../(actions)/role-application"

const initialState = {
    role: "",
    message: null,
}
export default async function RoleApplicationForm() {
    const [state, formAction] = useFormState(sendRoleApplicationAction, initialState)
  return (
<form action={formAction} className="role-application-form">
  <div className="role-input-container">
    <input type="checkbox" name="teacher" value='teacher'/>
    <label htmlFor="teacher">Teacher</label>
    </div>
  <div className="role-input-container">
    <input type="checkbox" name="admin" value='admin'/>
    <label htmlFor="admin">Admin</label>
    </div>
    <button type="submit">Submit</button>
</form>
  )
}


