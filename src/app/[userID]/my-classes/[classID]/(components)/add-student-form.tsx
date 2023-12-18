'use client';

import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import addStudentAction from "../(actions)/add-student-action";
import { student, testClass } from "@/lib/definitions";

const initialState = {
  firstName: null,
  lastName: null,
  testClass: null,
  id: null,
  message: null,
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending}>
      Add
    </button>
  );
}

export default function AddStudentForm({ testClass }: { testClass: testClass }) {
  const [state, formAction] = useFormState(addStudentAction, initialState);


  // form should have a hidden input for testClass
  return (
    <>
      <div className="form-container">
        <h4 className="form-header">Add Student to {testClass.block} {testClass.occurrence} {testClass.name}</h4>
        <form className="add-data-form" action={formAction}>
          <div className="input-container">
            <input type="hidden" id="testClass" name="testClass" value={testClass.id} readOnly />
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" name="firstName" />
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" name="lastName" />
          </div>
          <SubmitButton />
        </form>
        <p aria-live="polite" className="sr-only" role="status">
          {state?.message}
        </p>
      </div>
    </>
  );
}
