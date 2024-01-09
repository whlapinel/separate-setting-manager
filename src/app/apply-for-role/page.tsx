import { getUserID, isCmsDomain } from "@/lib/authorization";
import RoleApplicationForm from "./(components)/role-application-form";
import { getRoles, getPendingRoles } from "@/lib/data";


export default async function RoleApplicationPage() {

    // todo: also show user their current role(s).

    const hasCmsDomain: boolean = await isCmsDomain();
    if (!hasCmsDomain) {
        return (
            <p>You are currently logged in with a Non-CMS account. Please log in with a CMS account.</p>
        )
    }
    const userID = await getUserID();

    const pendingRoles = await getPendingRoles(userID);
    console.log(pendingRoles);

    const roles = await getRoles(userID);
    console.log(roles);



    return (
        <>
            <h3>Application Page</h3>
            <p>Apply for a role here.</p>
            <p>Once your role has been approved, you will be able to log in to the web application.</p>
            <RoleApplicationForm userID={userID} pendingRoles={pendingRoles} roles={roles} />
        </>
    );
}
