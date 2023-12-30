'use client';

import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import addClassAction from "../../(actions)/add-class-action";
import Link from "next/link";
import { Input } from "@/ui/input";
import { Select } from "@/ui/select";
import { Fieldset } from "@/ui/fieldset";
import { Legend } from "@/ui/fieldset";
import { Label } from "@/ui/fieldset";
import { Radio, RadioGroup } from "@/ui/radio";
import { SubmitButton } from "@/ui/submit-button";

const initialState = {
  nameOfClass: "",
  block: "",
  occurrence: "",
  message: null,
}



export default function AddClassForm({ userID }) {
  const [state, formAction] = useFormState(addClassAction, initialState);

  return (
    <>
      <div className="flex flex-col items-center">

        <form className="flex flex-col" action={formAction}>
          <h4 className=" self-center">Add Class</h4>
          <div className="input-container">
            <label htmlFor="name">Class Name</label>
            <Input className="" type="text" id="name" name="name" placeholder="e.g. Earth & Environmental Science" />
            <input type="hidden" id="teacher" name="teacher" value={userID} readOnly />
            <label htmlFor="block">Block</label>
            <Select id="block" name="block" required>
              <option value={""}> </option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </Select>
          </div>
          <Fieldset className="input-container-radio">
            <Legend>Occurrence</Legend>
            <RadioGroup name="occurrence" className="flex flex-col">
              <div className="flex">
                <Radio id="A-Day" value="A" />
                <Label htmlFor="A-Day">A Day</Label>
              </div>
              <div className="flex">
                <Radio id="B-Day" value="B" />
                <Label htmlFor="B-Day">B Day</Label>
              </div>
              <div className="flex">
                <Radio id="Both" value="AB" defaultChecked />
                <Label htmlFor="Both">Both</Label>
              </div>
            </RadioGroup>
          </Fieldset>
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
