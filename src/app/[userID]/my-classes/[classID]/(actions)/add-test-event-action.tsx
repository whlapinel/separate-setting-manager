"use server";

import { revalidatePath } from "next/cache";
import { nanoid } from "nanoid";
import { createClass } from "@/lib/data";
import { testClass, testEvent } from "@/lib/definitions";
import { createTestEvent } from "@/lib/data";

export default async function addTestEventAction(prevState, formData) {
  // console.log(prevState);
  // console.log(formData);
  console.log("running addTestEventAction (server action)");
  console.log("formData", formData);
  console.log("prevState", prevState);
  
  const newTestEvent: testEvent = {
    id: nanoid(),
    testName: formData.get("name"),
    testDate: formData.get("date"),
    testClass: formData.get("testClass"),
  };
  let status: string;
  try {
    status = await createTestEvent(newTestEvent);
    revalidatePath('/[teacher]/my-classes', 'page');
  } catch (error) {
    status = error.message
  } finally {
    return {
      message: status
    }
  }
}
