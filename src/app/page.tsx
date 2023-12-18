import Link from "next/link";
import { getUsers } from "@/lib/data";
import { user } from "@/lib/definitions";

export default async function Home({ params }) {
  console.log("rerendering Home (server component)");
  
  const users: Array<user> = await getUsers();
  console.log("users", users);


  // const testUnits = await GetTestData();



  const userElements = users.map((user) => {
    const userNameString = `${user.firstName} ${user.lastName}`;
    const slug = userNameString.replace(" ", "-");

    return (
      <Link
        href={`/${slug}/my-classes?teacher=${user.id}`}
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
