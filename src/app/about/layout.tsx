import Head from "next/head";
import SideNav from "../(components)/side-nav";
import { userOptions } from "../options";
import Heading from "@/ui/heading";
import { getUserName } from "@/lib/authorization";

export default async function AboutLayout({ children }) {

    const userName = await getUserName();

    return (
        <>
            <SideNav options={userOptions} userName={userName}/>
            <div className="flex flex-col items-center">
                <Heading>About</Heading>
                {children}
            </div>
        </>
    );
}