"use server";

import { revalidatePath } from "next/cache";
import { nanoid } from "nanoid";
import { createClass } from "@/lib/data";
import { testClass } from "@/lib/definitions";

export default async function addClassAction(prevState, formData): Promise<object> {
  console.log("running AddClassAction");
  console.log("formData", formData);
  console.log("prevState", prevState);
  console.log("formData.get('name')", formData.get("name"));
  console.log("formData.get('block')", formData.get("block"));
  console.log("formData.get('occurrence')", formData.get("occurrence"));
  console.log("formData.get('teacher')", formData.get("teacher"));

  let status: string;
  const newClass: testClass = {
    id: nanoid(),
    name: formData.get("name"),
    block: formData.get("block"),
    occurrence: formData.get("occurrence"),
    teacher: formData.get("teacher"),
  };
  try {
    status = await createClass(newClass);
    revalidatePath('/[teacher]/my-classes', 'page');
  } catch (error) {
    status = error.message
  } finally {
    return {
      message: status
    }
  }
}
