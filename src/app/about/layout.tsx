import Head from "next/head";
import SideNav from "../(components)/side-nav";
import { userOptions } from "../options";
import Heading from "@/ui/heading";

export default function AboutLayout({ children }) {
    return (
        <>
            <SideNav options={userOptions} />
            <div className="flex flex-col items-center">
                <Heading>About</Heading>
                {children}
            </div>
        </>
    );
}