'use server';

import React from 'react'
import type { status } from '@/lib/definitions';
import { Client } from 'pg';
import { revalidatePath } from 'next/cache';

export default async function editUserRolesAction(prevState, formData) {
    let status: status;

    console.log(prevState, formData);

    // TODO: implement editUserRolesAction
    // update database with new user roles

    // compare prevState and formData to determine what changed
    const adminChanged = prevState.admin !== formData.get("admin");
    console.log("adminChanged", adminChanged);
    const teacherChanged = prevState.teacher !== formData.get("teacher");
    console.log("teacherChanged", teacherChanged);
    const isChanged = adminChanged || teacherChanged;
    console.log("isChanged", isChanged);
    if (!isChanged) {
        return { message: "No changes detected." };
    }

    const newRoles = [];
    if (formData.get("admin") === "on") {
        newRoles.push("admin");
    }
    if (formData.get("teacher") === "on") {
        newRoles.push("teacher");
    }

    console.log("newRoles", newRoles);

    const client = new Client();
    try {
        await client.connect();
        await client.query(
            `UPDATE "users" SET "roles" = $1 WHERE "id" = $2`,
            [newRoles, formData.get("userID")]
        );
        status = "success";
    }
    catch (err) {
        console.error(err.message);
        status = err.message;
    }
    finally {
        await client.end();
        revalidatePath("/admin/users", "page");
    }
   
  return {message: status}
}
