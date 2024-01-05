
import ProtectPage from "@/lib/authorization";
import { redirect } from "next/navigation";
import SideNav from "../(components)/side-nav";

const adminOptions = [
    { name: 'Admin Home', url: `/admin` },
    { name: 'Users', url: `/admin/users` },
    { name: 'Pending Applications', url: `/admin/pending-applications` },
    { name: 'Testing Rooms', url: `/admin/testing-rooms` },
    { name: 'Room Assignments', url: `/admin/room-assignments` },
];


export default async function AdminLayout({ children }) {

    const isAuth: boolean = await ProtectPage("admin");

    if (!isAuth) {
        redirect("/not-authorized");
    }

    // otherwise render children


    return (
        <>
            <SideNav options={adminOptions} />
            <div className="flex flex-col items-center">
                {children}
            </div>
        </>
    )
}
