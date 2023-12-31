"use server";

import { revalidatePath } from "next/cache";
import { editClass } from "@/lib/data";

export default async function editClassAction(prevState, formData) {
  console.log(prevState);
  console.log(formData);
  console.log("running EditClassAction server action");
  console.log("formData", formData);
  console.log("prevState", prevState);
  console.log("");

  const id = formData.get("id");
  console.log("id", id);
  const name = formData.get("name");
  console.log("name", name);
  const block = formData.get("block");
  console.log("block", block);
  const occurrence = formData.get("occurrence");

  const changedClass = {
    id: formData.get("id"),
    name: formData.get("name"),
    block: formData.get("block"),
    occurrence: formData.get("occurrence"),
  };
  let status: string = null;
  try {
    status = await editClass(changedClass);
    revalidatePath('/[teacher]/my-classes', 'page');
  } catch (error) {
    status = error.message
  } finally {
    return {
      message: status
    }
  }
}