'use server';

import { revalidatePath } from "next/cache";

export async function deleteClassAction(prevState, formData) {

    const id = formData.get("id");
    console.log("id", id);
    // delete class from DB
    try {
        const res = await fetch(`http://localhost:3001/testUnits/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
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