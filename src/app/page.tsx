import Link from "next/link";
import { getUsers } from "@/lib/data";
import { user } from "@/lib/definitions";
import checkAuthorization from "@/lib/authorization";

export default async function Home() {
  console.log("rendering Home (server component)");

  // 

  

  // look for user in DB

  // if not in DB, create user in DB

  // if in DB, get user from DB


  const users: Array<user> = await getUsers();
  console.log("users", users);

  const userElements = users.map((user) => {
    const userNameString = `${user.firstName} ${user.lastName}`;
    return (
      <Link
        href={`/${user.id}/my-classes`}
        key={user.id}
      >
        {userNameString}
      </Link>
    );
  });

  return (
    <main>
      <h3>
        "Log in" (Select Teacher from list)
      </h3>
      <div className="teacher-list-container">{userElements}</div>
    </main>
  );
}