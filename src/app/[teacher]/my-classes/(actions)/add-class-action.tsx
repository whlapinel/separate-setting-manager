"use server";

import { revalidatePath } from "next/cache";
import { nanoid } from "nanoid";

export default async function addClassAction(prevState, formData) {
  // console.log(prevState);
  // console.log(formData);
  console.log("rendering AddClassAction (server component)");
  console.log("formData", formData);
  console.log("prevState", prevState);
  console.log("formData.get('name')", formData.get("name"));
  console.log("formData.get('block')", formData.get("block"));

  const name = formData.get("name");
  const block = formData.get("block");
  const occurrence = formData.get("occurrence");
  const teacher = formData.get("teacher");
  const id = nanoid();

  // send form to DB
  try {
    const res = await fetch("http://localhost:3001/testUnits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        block,
        occurrence,
        teacher,
        id
      })
    });
    const data = await res.json();
    console.log(data);
    revalidatePath(`/`, "layout");
    return { message: `${data}` };
  } catch (err) {
    console.log(err.message);
    return { message: `${err.message}` };
  }
}
