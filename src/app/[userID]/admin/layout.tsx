import { currentUser } from "@clerk/nextjs";
import checkAuthorization from "@/lib/authorization";
import { getUserByID } from "@/lib/data";
import { redirect } from "next/navigation";
import { User } from "@clerk/nextjs/dist/types/server";
import { role, user } from "@/lib/definitions";
import SideNav from "@/app/(components)/side-nav";


export default async function AdminLayout({ children, params }) {
    const { userID } = params;
    const user: User = await currentUser();
    const dbUser: user = await getUserByID(userID);
    const requiredRole: role = "admin";
    const isAuth: boolean = await checkAuthorization(user, requiredRole, userID);
    if (!isAuth) {
        redirect("/not-authorized");
    }

    return (
        <>
        { children }
        </>
    )




}
