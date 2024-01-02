'use server';

import type { status } from "@/lib/definitions";
import type { testRoom } from "@/lib/definitions";
import { revalidatePath } from "next/cache";
import { Client } from "pg";

// this function adds testing room to the database. It is called from the admin page.

export async function addTestRoom(prevState: any, formData: FormData) {
    console.log("addTestRoom running...");
    console.log("formData", formData);
    console.log("prevState", prevState);

    // get data from formData
    const roomNumber = formData.get("roomNumber").toString();
    console.log("roomNumber", roomNumber);

    const roomDescription = formData.get("roomDescription").toString();
    console.log("roomDescription", roomDescription);

    // update database
    const client = new Client();
    let status: status;
    try {
        await client.connect();
        await client.query(
            `INSERT INTO "testRooms" ("roomNumber", "roomDescription") VALUES ('${roomNumber}', '${roomDescription}')`
        );
        status = "success";
    }
    catch (err) {
        console.error(err.message);
        status = err.message;
    }
    finally {
        await client.end();
    }
    revalidatePath("/[userID]/admin", "page")

    return { message: status}

}

