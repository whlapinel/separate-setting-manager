import checkAuthorization from "@/lib/authorization";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getPendingApplications } from "@/lib/data";
import { role, user } from "@/lib/definitions";
import { useFormStatus } from "react-dom";
import { useFormState } from "react-dom"
import AdjudicationForm from "./(components)/adjudication-form";
import processApplication from "./(actions)/process-application"


export default async function PendingApplicationsPage({params}) {
    const {userID} = params;


    const pendingApplications = await getPendingApplications();

    const applicationElements = pendingApplications?.map((user: user) => {
        const userNameString = `${user.firstName} ${user.lastName}`;
        return (
            <AdjudicationForm user={user} key={user.id} />
        );
    }
    )

    return (
        <>
            <h1>Applications</h1>
            <div className="application-container">
                {applicationElements}
            </div>
        </>
    );
}
