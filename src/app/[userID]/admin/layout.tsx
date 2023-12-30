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
    const isAuth: boolean = await checkAuthorization(user, requiredRole);
    if (!dbUser || user.primaryEmailAddressId !== userID) {
        console.log('checking id match');
        console.log(!dbUser, user.primaryEmailAddressId !== userID);
        redirect("/not-authorized");
    }

    const options = [
        { name: 'Users', url: `/${userID}/admin/users` },
        { name: 'Pending Applications', url: `/${userID}/admin/pending-applications` },
        { name: 'Testing Rooms', url: `/${userID}/admin/testing-rooms` },
        { name: 'Room Assignments', url: `/${userID}/admin/room-assignments` },
    ];

    return (
        <>
            <div className="flex">
                <SideNav user={dbUser} params={params} options={options} />
                {children}
            </div>
        </>
    )




}
