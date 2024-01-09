import Heading from "@/ui/heading";
import { teacherOptions } from "./options";
import { Link } from "@/ui/link";
import HomePageOptions from "@/ui/home-page-options";

export default async function Teacher() {

  return (
    <>
      <Heading>Teacher Menu</Heading>
      <HomePageOptions options={teacherOptions}/>
      </>
  );
}
