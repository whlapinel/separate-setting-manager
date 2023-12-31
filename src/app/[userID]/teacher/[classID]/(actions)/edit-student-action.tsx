"use server";

import { revalidatePath } from "next/cache";
import { editStudent } from "@/lib/data";

export default async function editStudentAction(prevState, formData) {
    console.log(prevState);
    console.log(formData);

    console.log("running EditStudentAction server action");
    console.log("formData", formData);
    console.log("prevState", prevState);
    console.log("");

    const id = formData.get("id");
    console.log("id", id);
    const firstName = formData.get("firstName");
    console.log("firstName", firstName);
    const lastName = formData.get("lastName");
    console.log("lastName", lastName);

    const changedStudent = {
        id: formData.get("id"),
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
    };
    let status: string = null;
    try {
        status = await editStudent(changedStudent);
        revalidatePath('/[teacher]/my-classes', 'page');
    } catch (error) {
        status = error.message
    } finally {
        return {
            message: status
        }
    }
}