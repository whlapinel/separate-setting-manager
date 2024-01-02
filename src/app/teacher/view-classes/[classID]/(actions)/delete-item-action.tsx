'use server';

import { revalidatePath } from "next/cache";
import {deleteItem} from "@/lib/data";



export async function deleteItemAction(prevState, formData) {

    const id: string = formData.get("id");
    const tableName = formData.get("tableName");
    console.log("id", id);
    // delete class from DB
    deleteItem(id, tableName);
    revalidatePath('/[teacher]/my-classes', 'page');
}