import test from "node:test";
import EditClassForm from "../(components)/(client components)/edit-class-form";
import { getTestClassByID } from "@/lib/data";
import { currentUser } from "@clerk/nextjs";
import checkAuthorization from "@/lib/authorization";
import { redirect } from "next/navigation";

export default async function EditClass({ params }) {
  const { classID } = params;
  const testClass = await getTestClassByID(classID);

  return (
    <div>
      <EditClassForm testClass={testClass} />
    </div>
  )
}
