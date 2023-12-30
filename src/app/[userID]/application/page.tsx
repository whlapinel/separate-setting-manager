import { currentUser } from "@clerk/nextjs";
import protectPage from "@/lib/authorization";
import sendRoleApplicationAction from "./(actions)/role-application";
import RoleApplicationForm from "./(components)/(client components)/role-application-form";
import { Client } from "pg";
import { status } from "@/lib/definitions";

export default async function RoleApplicationPage() {
    const user = await currentUser();
    const requiredRole = "user";
    protectPage(user, requiredRole);

    const userID = user.primaryEmailAddressId;

    // get pendingRoles for this user
    // if pendingRoles.length > 0, display message that they have pending roles

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
            <p>If you have reached this page, it is because you have a CMS email address but have not been assigned a role within the web application. Please select a role to apply for and then click 'submit.'</p>
            <p>Once your role has been approved, you will be able to log in to the web application.</p>
            <RoleApplicationForm userID={userID} pendingRoles={pendingRoles}/>
        </>
    );
}
