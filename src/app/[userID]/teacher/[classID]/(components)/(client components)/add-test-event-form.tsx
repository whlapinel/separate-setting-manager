'use client';

import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import addTestEventAction from "../../(actions)/add-test-event-action";
import Link from "next/link";

const initialState = {
  nameOfClass: "",
  block: "",
  occurrence: "",
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

export default function AddTestEventForm({ classID, userID }: { classID: string, userID: string }) {
  const [state, formAction] = useFormState(addTestEventAction, initialState);

  return (
    <>
      <div className="form-container">
        <h4 className="form-header">Add Test Event</h4>
        <form className="add-data-form" action={formAction}>
          <div className="input-container">
            <label htmlFor="name">Test Name</label>
            <input type="text" id="name" name="name" />
            <input type="hidden" id="testClass" name="testClass" value={classID} readOnly />
            <label htmlFor="date">Date</label>
            <input type="date" id="date" name="date" />
          </div>
          <SubmitButton />
        </form>
        {state.message ?
          <>
            <p aria-live="polite" className="sr-only" role="status">
              {state.message}
            </p>
            <Link href={`/${userID}/my-classes/`}>Return to My Classes</Link>
          </>
          : null}
      </div>
    </>
  );
}
