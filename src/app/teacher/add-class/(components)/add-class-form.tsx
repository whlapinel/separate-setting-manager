'use client';

import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import addClassAction from "../(actions)/add-class-action";
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
      <div className="flex gap-2 flex-col w-72 justify-center">
        <h4 className="self-center">Add Class</h4>
        <form className="flex gap-2 flex-col" action={formAction}>
          <div className="grid gap-1 grid-cols-[1fr_2fr]">
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
          <Fieldset className="flex flex-col items-center">
            <Legend>Occurrence</Legend>
            <RadioGroup name="occurrence" className="grid grid-cols-3 gap-4 justify-start items-end">
              <div>
                <Radio id="A-Day" value="A" />
                <Label htmlFor="A-Day" className='m-0'> A Day</Label>
              </div>
              <div>
                <Radio id="B-Day" value="B" />
                <Label htmlFor="B-Day"> B Day</Label>
              </div>
              <div>
                <Radio id="Both" value="AB" defaultChecked />
                <Label htmlFor="Both"> Both</Label>
              </div>
              
            </RadioGroup>
          </Fieldset>
          <SubmitButton className='w-24'/>
        </form>
        {state.message ?
          <>
            <p aria-live="polite" className="sr-only" role="status">
              {state.message}
            </p>
            <Link href={`/teacher/view-classes/`}>Return to View Classes</Link>
          </>
          : null}
      </div>
    </>
  );
}
