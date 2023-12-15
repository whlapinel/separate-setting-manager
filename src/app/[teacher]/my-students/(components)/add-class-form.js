'use client';

import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import addClassAction from "../(actions)/add-class-action.js";

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

export default function AddClassForm({ teacher }) {
  const [state, formAction] = useFormState(addClassAction, initialState);
  
  return (
    <>
      <div className="form-container">
      <h4 className="form-header">Add Class</h4>
        <form className="add-data-form" action={formAction}>
          <div className="input-container">
          <label htmlFor="name">Class Name</label>
          <input type="text" id="name" name="name"/>
          <input type="hidden" id="teacher" name="teacher" value={teacher} readOnly/>
          <label htmlFor="block">Block</label>
          <select id="block" name="block" required>
            <option value={""}> </option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
          </div>
            <fieldset className="input-container-radio">
              <legend>Occurrence</legend>
              <div className="radio-container">
              <input type="radio" id="A-Day" name="occurrence" value="A" required/>
              <label htmlFor="A-Day">A Day</label>
              </div>
              <div className="radio-container">
              <input type="radio" id="B-Day" name="occurrence" value="B"/>
              <label htmlFor="B-Day">B Day</label>
              </div>
              <div className="radio-container">
              <input type="radio" id="Both" name="occurrence" value="AB"/>
              <label htmlFor="Both">Both</label>
              </div>
            </fieldset>
          <SubmitButton />
        </form>
          <p aria-live="polite" className="sr-only" role="status">
            {state?.message}
          </p>
      </div>
    </>
  );
}
