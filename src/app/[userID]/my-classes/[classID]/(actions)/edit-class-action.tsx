"use server";

import { revalidatePath } from "next/cache";
import { nanoid } from "nanoid";
import { editClass } from "@/lib/data";

export default async function editClassAction(prevState, formData) {
  console.log(prevState);
  console.log(formData);
  console.log("running EditClassAction server action");
  console.log("formData", formData);
  console.log("prevState", prevState);
  console.log("");
  
  console.log("formData.get('name')", formData.get("name"));
  console.log("formData.get('block')", formData.get("block"));
  console.log("formData.get('occurrence')", formData.get("occurrence"));
  
  const changedClass = {
    id: nanoid(),
    name: formData.get("name"),
    block: formData.get("block"),
    occurrence: formData.get("occurrence"),
  };
  editClass(changedClass);
  revalidatePath('/[teacher]/my-classes', 'page');
}
