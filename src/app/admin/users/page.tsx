import { Client } from "pg";
import { getUsers } from "@/lib/data";
import type { user } from "@/lib/definitions";
import UserTable from "./(components)/user-table";

export default async function UsersPage() {

    const users: Array<user> = await getUsers();

    return (
        <>
            <UserTable users={users}/>
        </>
    );
}