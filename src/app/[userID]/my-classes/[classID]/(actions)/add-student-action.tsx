"use server";

import { revalidatePath } from "next/cache";
import { nanoid } from "nanoid";
import { createClass } from "@/lib/data";
import { createStudent } from "@/lib/data";
import { testClass } from "@/lib/definitions";
import { student } from "@/lib/definitions";

export default async function addStudentAction(prevState, formData) {
  // console.log(prevState);
  // console.log(formData);
  console.log("formData", formData);
  console.log("prevState", prevState);

  
  const newStudent: student = {
    id: nanoid(),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    testClass: formData.get("testClass"),
  };
  let status: string;
  try {
    status = await createStudent(newStudent);
    revalidatePath('/[teacher]/my-classes', 'page');
  } catch (error) {
    status = error.message
  } finally {
    return {
      message: status
    }
  }
}