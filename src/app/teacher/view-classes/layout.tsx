import ProtectPage from "@/lib/authorization";
import { Redirect } from "next";
import { redirect } from "next/navigation";

export default async function ViewClassesLayout({ children }) {



  return (
      <>
          {children}
      </>
  )
}
