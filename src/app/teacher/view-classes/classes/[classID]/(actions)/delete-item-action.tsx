'use server';

import { revalidatePath } from "next/cache";
import {deleteItem} from "@/lib/data";
import { currentUser } from "@clerk/nextjs";
import { getRoles } from "@/lib/data"

export async function deleteItemAction(prevState, formData): Promise<{message: string}> {
    const userID = (await currentUser()).primaryEmailAddressId;
    const roles = await getRoles(userID);
    if (!roles.includes('teacher')) {
        return {
            message: 'error: not authorized'
        }
    }

    const id: string = formData.get("id");
    const tableName = formData.get("tableName");
    console.log("id", id);
    // delete item from DB
    deleteItem(id, tableName);
    revalidatePath('/[teacher]/view-classes/[classID]', 'page');
}