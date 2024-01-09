import { currentUser } from "@clerk/nextjs";
import { getUserByID } from "./data";
import { role, user } from "./definitions";
import { User } from "@clerk/nextjs/dist/types/server";

export async function getUserID(): Promise<string> {
  const userID = (await currentUser()).primaryEmailAddressId;
  return userID;
};

export async function isCmsDomain(): Promise<boolean> {
  const emailAddress: string = (await currentUser()).emailAddresses[0].emailAddress;
  return emailAddress.includes("cms.k12.nc.us");
}

export async function getUserName(): Promise<string> {
  const firstName = (await currentUser()).firstName;
  const lastName = (await currentUser()).lastName;
  const userName = `${firstName} ${lastName}`;
  return userName;
};

export default async function ProtectPage(requiredRole: role): Promise<boolean> {
  // is user in database?  if not return false
  const clerkUser: User = await currentUser();
  const clerkUserId = clerkUser.primaryEmailAddressId;
  const dbUser: user = await getUserByID(clerkUserId);
  if (!dbUser) return false;
  
  // does user have required role?
  const userRoles = dbUser.roles;
  const hasRole: boolean = userRoles.includes(requiredRole);
  if (!hasRole) return false;

  return true;
}