'use client'
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function GetPath({ reportPathChange }) {

    const pathname = usePathname();

    useEffect(() => {
        reportPathChange(pathname);
    }, [pathname]);

    return null;
}
