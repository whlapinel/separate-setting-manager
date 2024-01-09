import HomePageOptions from "@/ui/home-page-options";
import { userOptions } from "./options";
import SideNav from "./(components)/side-nav";
import Heading from "@/ui/heading";


export default async function Home() {

  return (
    <>
      <SideNav options={userOptions} />
      <div className="flex flex-col items-center">
        <Heading>Home</Heading>
        <HomePageOptions options={userOptions} />
      </div>
    </>
  );
}
