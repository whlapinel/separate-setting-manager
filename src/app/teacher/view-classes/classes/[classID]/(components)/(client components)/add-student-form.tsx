'use client';

import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import addStudentAction from "../../(actions)/add-student-action";
import { student, testClass } from "@/lib/definitions";
import Link from "next/link";
import { Input } from "@/ui/input";
import { SubmitButton } from "@/ui/submit-button";

const initialState = {
  firstName: null,
  lastName: null,
  testClass: null,
  id: null,
  message: null,
}

export default function AddStudentForm({ classID }: { classID: string }) {
  const [state, formAction] = useFormState(addStudentAction, initialState);

  // form should have a hidden input for testClass
  return (
    <form action={formAction}>
      <div className="flex flex-col gap-1 text-left">
        <input type="hidden" id="testClass" name="testClass" value={classID} readOnly />
        <label htmlFor="firstName">First Name</label>
        <Input type="text" id="firstName" name="firstName" />
        <label htmlFor="lastName">Last Name</label>
        <Input type="text" id="lastName" name="lastName" />
      </div>
      <SubmitButton className="my-2" />
      {state.message ?
        <p aria-live="polite" className="sr-only" role="status">
          {state.message}
        </p>
        : null}
    </form>
  );
}
