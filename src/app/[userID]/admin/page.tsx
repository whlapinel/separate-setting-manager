import checkAuthorization from "@/lib/authorization";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getPendingApplications } from "@/lib/data";
import { role, user } from "@/lib/definitions";
import processApplication from "./pending-applications/(actions)/process-application";
import { useFormStatus } from "react-dom";
import { useFormState } from "react-dom"
import AdjudicationForm from "./pending-applications/(components)/adjudication-form";


export default async function AdminHome() {
  const user = await currentUser();
  const requiredRole = "admin";
  const isAuth: boolean = await checkAuthorization(user, requiredRole);
  if (!isAuth) {
    redirect("/not-authorized");
    return null;
  }


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
      <h1>Admin Home</h1>
      <h2>Applications</h2>
      <div className="application-container">
        {applicationElements}
      </div>
    </>
  );
}
