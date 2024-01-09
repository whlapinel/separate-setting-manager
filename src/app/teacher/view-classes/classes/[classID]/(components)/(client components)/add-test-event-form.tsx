'use client';

import { useFormState } from "react-dom";
import addTestEventAction from "../../(actions)/add-test-event-action";
import { SubmitButton } from "@/ui/submit-button";
import { Input } from "@/ui/input";

const initialState = {
  nameOfClass: "",
  block: "",
  occurrence: "",
  message: null,
}

export default function AddTestEventForm({ classID }: { classID: string }) {
  const [state, formAction] = useFormState(addTestEventAction, initialState);

  return (
    <form action={formAction}>
      <div className="flex flex-col gap-1 text-left">
        <label htmlFor="name">Test Name</label>
        <Input type="text" id="name" name="name" />
        <input type="hidden" id="testClass" name="testClass" value={classID} readOnly />
        <label htmlFor="date">Date</label>
        <Input type="date" id="date" name="date" />
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
