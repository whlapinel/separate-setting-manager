import { get } from "http";
import { redirect } from "next/navigation";
import { user } from "./definitions";
import { Client } from "pg";
import { currentUser } from "@clerk/nextjs";
import { role } from "./definitions";
import { getUserByID } from "./data";
import { is } from "date-fns/locale";
import { User } from "@clerk/nextjs/dist/types/server";

export default async function checkAuthorization(loggedInUser: User, requiredRole: role): Promise<boolean> {
  console.log("ProtectPage running...");

  // BEGIN REFACTORING
  console.log("user", loggedInUser);

  // a. is user logged in with CMS account?
  const userID = loggedInUser.primaryEmailAddressId;
  console.log("primaryEmailAddressId", userID);
  const domain = loggedInUser.emailAddresses[0].emailAddress.split("@")[1];
  console.log("domain", domain);
  const isCmsDomain = domain === "cms.k12.nc.us";
  console.log("isCmsDomain", isCmsDomain);

  // a1. if not, return false
  if (!isCmsDomain) {
    console.log("non-Cms domain");
  return false;
  }

  // b. is user in DB?
  let dbUser: user = null;
  if (isCmsDomain) {
    dbUser = await getUserByID(userID);
    console.log("dbUser", dbUser);
  }

  // b1. if not, create user in DB and return false
  if (isCmsDomain && !dbUser) {
    const client = new Client();
    try {
      await client.connect();
      const res = await client.query(
        `INSERT INTO "users" ("id", "firstName", "lastName", "email", "roles") VALUES ('${userID}', '${loggedInUser.firstName}', '${loggedInUser.lastName}', '${loggedInUser.emailAddresses[0].emailAddress}', '{"user"}')`
      );
      const dbUser = res.rows[0];
      console.log("dbUser", dbUser);
    } catch (err) {
      console.error(err.message);
    } finally {
      await client.end();
      return false;
    }
  }

  // c. does user have required role?
  let hasRequiredRole: boolean = false;
  if (isCmsDomain && dbUser) {
    hasRequiredRole = dbUser.roles.includes(requiredRole);
  }

  // c1. if not, redirect to application page
  if (!hasRequiredRole) {
    console.log("user does not have required role, redirecting to application page");
    return false;
  }

  // d. if so, continue to page
  if (hasRequiredRole) {
    console.log("user has required role, continuing to page");
    return true;
  }

  // END REFACTORING
}
