'use server';

import { status } from "@/lib/definitions";
import { revalidatePath } from "next/cache";
import { Client } from "pg";


export default async function sendRoleApplicationAction(prevState, formData): Promise<object> {
    console.log("sendRoleApplicationAction running...");
    console.log("formData", formData);
    const userID = formData.get("id");
    console.log("userID", userID);
    const appliedForAdmin = formData.has("admin");
    console.log("appliedForAdmin", appliedForAdmin);
    const appliedForTeacher = formData.has("teacher");
    console.log("appliedForTeacher", appliedForTeacher);

    // update database
    const roles = [];
    if (appliedForAdmin) {
        roles.push("admin");
    }
    if (appliedForTeacher) {
        roles.push("teacher");
    }

    const client = new Client();
    let status: status;
    await client.connect();
    for (const role of roles) {
        console.log("role", role);
        try {
            await client.query(
                `UPDATE "users" SET "pending_roles" = array_append("pending_roles", '${role}') WHERE "id" = '${userID}'`
            );
            status = "success";
        }
        catch (err) {
            console.error(err.message);
            status = err.message;
        }
    }
    await client.end();
    revalidatePath("/apply-for-role", "page");
    return { message: status };
}
