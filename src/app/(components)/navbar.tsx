import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";


export default async function Navbar() {
  const user = await currentUser();
  const userID = user?.primaryEmailAddressId;

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
        <Link href={`/${userID}/calendar/0`}>Calendar</Link>
        <Link href={`/${userID}/admin`}>Admin</Link>
      </div>
    </>
  );
}
