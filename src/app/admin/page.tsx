
import type { option } from "@/lib/definitions";
import { Link } from "@/ui/link";
import { adminOptions } from "./options";
import Heading from "@/ui/heading";
import HomePageOptions from "@/ui/home-page-options";

export default async function AdminHome({params}) {

  return (
    <>
    <Heading>Admin Menu</Heading>
    <HomePageOptions options={adminOptions}/>
    </>
  );
}
