import HomePageOptions from "@/ui/home-page-options";
import { userOptions } from "./options";
import SideNav from "./(components)/side-nav";
import Heading from "@/ui/heading";
import { getUserName } from "@/lib/authorization";
import { getRoles } from "@/lib/data";
import { getUserID } from "@/lib/authorization";
import {sql} from "@vercel/postgres";
import { log } from "console";


export default async function Home() {

  const {rows} = await sql`SELECT * FROM users`;
  log(rows);

  const userName = await getUserName();
  const userID = await getUserID();
  const roles = await getRoles(userID);


  console.log("roles", roles);
  

  return (
    <>
      <SideNav options={userOptions} userName={userName}/>
      <div className="flex flex-col items-center">
        <Heading>Home</Heading>
        <HomePageOptions options={userOptions} />
        <p>Current Roles: {roles?.map((role) => role)}</p>
      </div>
    </>
  );
}
