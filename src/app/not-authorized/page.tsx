
import { UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { currentUser } from "@clerk/nextjs"
import { getUserByID } from "@/lib/data";
import { SignUpButton } from "@clerk/nextjs";

export default async function NotAuthorizedPage() {
    const user = await currentUser();
    console.log(user);
    const emailAddress = user.emailAddresses[0].emailAddress;
    if (user) {
        console.log(user.primaryEmailAddressId);
    }
    const isCmsDomain = emailAddress.includes("@cms.k12.nc.us");
    console.log("isCmsDomain", isCmsDomain);
    
    const dbUser = await getUserByID(user.primaryEmailAddressId);

    return (
        <>
            <h1>Not Authorized</h1>
            <p>You have reached this page for the following reason:
            </p>
            <ul>
                {!isCmsDomain?
                <li><em>You are currently logged in with a non-CMS Google email address.</em> Please select a different Google account.</li>:
                <li><em>You are currently logged in with a CMS email address</em> but have not been assigned a role within the web application. Please apply for a role and contact your administrator.
                </li>
                }
            </ul>
                {dbUser?
            <div>
            <Link href={`./${dbUser.id}/application`}>Welcome, {dbUser.firstName}! Apply for a role</Link>
            </div>:
            <SignUpButton/>
            }
        </>
    )
}
