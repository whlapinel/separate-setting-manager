import { currentUser } from "@clerk/nextjs";
import protectPage, { getUserID, isCmsDomain } from "@/lib/authorization";
import sendRoleApplicationAction from "./(actions)/send-role-application";
import RoleApplicationForm from "./(components)/role-application-form";
import { Client } from "pg";
import { status } from "@/lib/definitions";

export default async function RoleApplicationPage() {

    // todo: also show user their current role(s).
    
    const hasCmsDomain: boolean = await isCmsDomain();
    if (!hasCmsDomain) return <p>Non-CMS account</p>

    const userID = await getUserID();




    async function getPendingRoles(userID: string): Promise<Array<string>> {
        const client = new Client();
        let status: status;
        try {

            await client.connect();

            const res = await client.query(
                `SELECT pending_roles FROM users WHERE id = '${userID}'`,
            );
            console.log(res.rows[0]);
            status = "success";
            return res.rows[0].pending_roles;
        } catch (err) {
            console.log(err);
            status = "error";
        }
        finally {
            await client.end();
            console.log(status);
        }
    }
    const pendingRoles = await getPendingRoles(userID);
    console.log(pendingRoles);

    return (
        <>
            <h3>Application Page</h3>
            <p>Apply for a role here.</p>
            <p>Once your role has been approved, you will be able to log in to the web application.</p>
            <RoleApplicationForm userID={userID} pendingRoles={pendingRoles}/>
        </>
    );
}
