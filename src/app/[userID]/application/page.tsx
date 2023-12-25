import { currentUser } from "@clerk/nextjs";
import protectPage from "@/lib/authorization";
import roleApplicationAction from "./(actions)/role-application";
import RoleApplicationForm from "./(components)/(client components)/role-application-form";

export default function RoleApplicationPage() {
    const user = currentUser();
    const requiredRole = "user";
    protectPage(user, requiredRole);

    return (
        <>
            <h3>Application Page</h3>
            <p>If you have reached this page, it is because you have a CMS email address but have not been assigned a role within the web application. Please select a role to apply for and then click 'submit.'</p>
            <p>Once your role has been approved, you will be able to log in to the web application.</p>
            <RoleApplicationForm/>
        </>
    );
}
