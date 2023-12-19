'use client';

import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import addStudentAction from "../../(actions)/add-student-action";
import { student, testClass } from "@/lib/definitions";
import Link from "next/link";

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

export default function AddStudentForm({ testClass, userID }: { testClass: testClass, userID: string }) {
  const [state, formAction] = useFormState(addStudentAction, initialState);

  const { block, occurrence, name } = testClass;


  // form should have a hidden input for testClass
  return (
    <>
      <div className="form-container">
        <h4 className="form-header">Add Student to {block}{occurrence} {name}</h4>
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
        {state.message?
        <>
        <p aria-live="polite" className="sr-only" role="status">
          {state.message}
        </p>
        <Link href={`/${userID}/my-classes/`}>Return to My Classes</Link>
        </>
        :null}
        </div>
    </>
  );
}
