import Link from "next/link";
import { user } from "@/lib/definitions";
import type { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export default function SideNav({ user, params, options}: { user: user, params: any, options: Array<{name: string, url: string}> }) {

  console.log("params", params);

  const { classID } = params;
  const { userID } = params;

  const optionElements = options.map((option) => {
    return (
      <Link href={option.url} key={option.name}>{option.name}</Link>
    )
  })

  return (
    <>
      <div className="flex flex-col p-4 w-fit">
        <p>{user.firstName} {user.lastName}</p>
        {optionElements}
      </div>
    </>
  );
}
