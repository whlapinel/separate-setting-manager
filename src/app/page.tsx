import HomePageOptions from "@/ui/home-page-options";
import { userOptions } from "./options";
import SideNav from "./(components)/side-nav";
import Heading from "@/ui/heading";
import { getUserName } from "@/lib/authorization";


export default async function Home() {
  
  const userName = await getUserName();

  return (
    <>
      <SideNav options={userOptions} userName={userName}/>
      <div className="flex flex-col items-center">
        <Heading>Home</Heading>
        <HomePageOptions options={userOptions} />
      </div>
    </>
  );
}
