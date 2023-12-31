import checkAuthorization from "@/lib/authorization";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getPendingApplications } from "@/lib/data";
import { role, user } from "@/lib/definitions";
import processApplication from "./pending-applications/(actions)/process-application";
import { useFormStatus } from "react-dom";
import { useFormState } from "react-dom"
import AdjudicationForm from "./pending-applications/(components)/adjudication-form";


export default async function AdminHome({params}) {

  const {userID} = params;


  return (
    <>
      <h1>Admin Home</h1>
    </>
  );
}
