'use server';

import { status } from "@/lib/definitions";
import { Client } from "pg";
import { revalidatePath } from "next/cache";


export async function addRoomAssignmentAction(prevState, formData: FormData ) {
    console.log(prevState, formData);

    const roomNumber = formData.get("roomNumber").toString();
    const startDate = formData.get("startDate").toString();
    const endDate = formData.get("endDate").toString();
    const desig = formData.get("desig").toString();

    console.log(roomNumber);
    console.log(startDate);
    console.log(endDate);
    console.log(desig);

    // update database
    let status: status;
    const client = new Client();
    try {
        await client.connect();
        await client.query(
            `INSERT INTO "roomAssignments" ("roomNumber", "startDate", "endDate", "desig") 
            VALUES ('${roomNumber}', '${startDate}', '${endDate}', '${desig}')`
        );
        status = "success";
    }
    catch (err) {
        console.error(err.message);
        status = err.message;
    }
    finally {
        await client.end();
        revalidatePath("/[userID]/admin/room-assignments", "page");
    }
}