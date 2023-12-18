'use server';

import { revalidatePath } from "next/cache";
import {deleteTestClass} from "@/lib/data";
import { testClass } from "@/lib/definitions";


export async function deleteClassAction(prevState, formData) {

    const id: testClass['id'] = formData.get("id");
    console.log("id", id);
    // delete class from DB
    deleteTestClass(id);
    revalidatePath('/[teacher]/my-classes', 'page');
}