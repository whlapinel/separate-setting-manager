import Link from "next/link";
import { getUsers } from "@/lib/data";
import { user } from "@/lib/definitions";
import checkAuthorization from "@/lib/authorization";
import { currentUser } from "@clerk/nextjs";
import { getUserByID } from "@/lib/data";

export default async function Home() {
  console.log("rendering Home (server component)");
  const user = await currentUser();
  const userID = user.primaryEmailAddressId;
  const dbUser = await getUserByID(userID);

  const roles = dbUser.roles;

  const roleElements = roles.map((role) => {
    return (
      <ul>
        <li>
          <Link href={`/${userID}/${role}`}>{role}</Link>
        </li>
      </ul>
    );

  });

  return (
    <>
      <h3>
        Select a role
      </h3>
      {roleElements}
    </>
  );
}
