'use client';

import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import editClassAction from "../../../../@details/classes/[classID]/(actions)/edit-class-action";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending}>
      Submit Changes
    </button>
  );
}

export default function EditClassForm({ testClass }) {
  
  const initialState = {
    name: testClass.name,
    block: testClass.block,
    occurrence: testClass.occurrence,
    message: null,
  }

  const [state, formAction] = useFormState(editClassAction, initialState);
  const [form, setForm] = useState(initialState);


  function handleChange(e) {
    console.log(e.target.value);
    const { name, value } = e.target;
    setForm(prevState => ({ ...prevState, [name]: value }));
  }

  return (
    <>
      <div className="form-container">
        <h4 className="form-header">Edit Class</h4>
        <form className="add-data-form" action={formAction}>
          <div className="input-container">
            <label htmlFor="name">Class Name</label>
            <input type="text" id="name" name="name" value={form.name} onChange={handleChange}/>
            <input type="hidden" id="testClassID" name="testClassID" value={testClass.id} readOnly />
            <label htmlFor="block">Block</label>
            <select id="block" name="block" value={form.block} onChange={handleChange} required>
              <option value={''}> </option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
          </div>
          <fieldset className="input-container-radio" onChange={handleChange}>
            <legend>Occurrence</legend>
            <div className="radio-container">
              <input type="radio" id="A-Day" name="occurrence" value="A" required checked={form.occurrence === "A"} onChange={handleChange}/>
              <label htmlFor="A-Day">A Day</label>
            </div>
            <div className="radio-container">
              <input type="radio" id="B-Day" name="occurrence" value="B" checked={form.occurrence === "B"} onChange={handleChange}/>
              <label htmlFor="B-Day">B Day</label>
            </div>
            <div className="radio-container">
              <input type="radio" id="Both" name="occurrence" value="AB" checked={form.occurrence === "AB"} onChange={handleChange}/>
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
