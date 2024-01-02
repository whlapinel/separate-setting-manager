import Link from "next/link";
import { UserButton } from "@clerk/nextjs";


export default async function Navbar() {

  return (
    <>
      <div className=" flex justify-between m-4">
        <h1 className=" text-4xl font-bold">Separate Setting Manager</h1>
        <div className=" flex-col ">
          <UserButton />
        </div>
      </div>
      <div className=" flex justify-start gap-2 m-4 text-xl">
        <Link href="/">Home</Link>
        <Link href="/admin">Admin</Link>
        <Link href="/teacher">Teacher</Link>
        <Link href="/sign-in">Sign In</Link>
        <Link href="/sign-up">Sign Up</Link>
      </div>
    </>
  );
}
