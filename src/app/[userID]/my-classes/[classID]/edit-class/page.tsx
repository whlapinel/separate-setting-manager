import test from "node:test";
import EditClassForm from "../(components)/(client components)/edit-class-form";
import { getTestClassByID } from "@/lib/data";
import { currentUser } from "@clerk/nextjs";
import checkAuthorization from "@/lib/authorization";
import { redirect } from "next/navigation";

export default async function EditClass({ params }) {
  const user = await currentUser();
  const requiredRole = "teacher";
  const isAuth: boolean = await checkAuthorization(user, requiredRole);
  if (!isAuth) {
    redirect("/not-authorized");
    return null;
  }
  const { classID } = params;
  const testClass = await getTestClassByID(classID);

  return (
    <div>
      <EditClassForm testClass={testClass} />
    </div>
  )
}
