'use server';

import { status } from "@/lib/definitions";


export default async function sendRoleApplicationAction(prevState, formData): Promise<object> {
    console.log("sendRoleApplicationAction running...");
    console.log("formData", formData);
    const { userID } = formData.get("id");


    let status: status;




    return {message: status};

}
