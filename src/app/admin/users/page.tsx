import { Client } from "pg";
import { getUsers } from "@/lib/data";
import type { user } from "@/lib/definitions";
import UserTable from "./(components)/user-table";
import { getUserID } from "@/lib/authorization";

export default async function UsersPage() {

    async function getData() {
        const [userID, users]: [string, Array<user>] = await Promise.all([getUserID(), getUsers()]);
        return { userID, users };
    }

    const { userID, users } = await getData();


    return (
        <>
            <UserTable userID={userID} users={users}/>
        </>
    );
}