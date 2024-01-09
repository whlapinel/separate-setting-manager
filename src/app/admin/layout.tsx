
import ProtectPage from "@/lib/authorization";
import { getUserName } from "@/lib/authorization";
import { redirect } from "next/navigation";
import SideNav from "../(components)/side-nav";
import { adminOptions } from "./options"


export default async function AdminLayout({ children }) {

    const isAuth: boolean = await ProtectPage("admin");
    const userName = await getUserName();

    if (!isAuth) {
        redirect("/not-authorized");
    }

    // otherwise render children

    return (
        <>
            <SideNav options={adminOptions} userName={userName}/>
            <div className="flex flex-col items-center">
                {children}
            </div>
        </>
    )
}
