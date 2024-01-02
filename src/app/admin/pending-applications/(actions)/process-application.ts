'use server'

import { status } from "@/lib/definitions";
// This file is used to process an application. It is called from the admin page.
// It takes the formData from the application and updates the database accordingly.
// It returns a message to the admin page.

import { log } from "console";
import { revalidatePath } from "next/cache";
import { Client } from "pg";

export default async function processApplication(prevState: FormData, formData: FormData): Promise<object> {
    let status: status;
    log("processApplication running...");
    log("formData", formData);
    log("prevState", prevState);

    // get data from formData
    const role = formData.get("role").toString();
    console.log("role", role);

    const adjudication = formData.get(role);
    console.log("adjudication", adjudication);

    const applicantID = formData.get("id").toString();
    console.log("applicantID", applicantID);

    // update database
    const client = new Client();
    try {
        await client.connect();
        await client.query(
            `UPDATE "users" SET "pendingRoles" = array_remove("pendingRoles", '${role}') WHERE "id" = '${applicantID}'`
        );
        if (adjudication === "approve") {
            await client.query(
                `UPDATE "users" SET "roles" = array_append("roles", '${role}') WHERE "id" = '${applicantID}'`
            );
        }
        status = "success";
    }
    catch (err) {
        console.error(err.message);
        status = err.message;
    }
    finally {
        await client.end();
    }
    revalidatePath("/admin/pending-applications", "page")

    return { message: status}
}