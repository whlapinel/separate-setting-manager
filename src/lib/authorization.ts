import { get } from "http";
import { redirect } from "next/navigation";
import { user } from "./definitions";
import { Client } from "pg";

export default async function checkAuthorization(loggedInUser: any, requiredRole: string): Promise<void> {
  console.log("checkAuthorization running...");
  console.log("user", loggedInUser);
  // log user email address
  const { emailAddresses } = loggedInUser;
  const { emailAddress } = emailAddresses[0];
  console.log("user email", emailAddress);
  // log user id
  const { primaryEmailAddressId } = loggedInUser;

  console.log("primaryEmailAddressId", primaryEmailAddressId);
  // log user's first name
  const { firstName } = loggedInUser;
  console.log("user first name", firstName);
  // log user's last name
  const { lastName } = loggedInUser;
  console.log("user last name", lastName);
  // get domain of email address
  const domain = loggedInUser.emailAddresses[0].emailAddress.split("@")[1];
  console.log("domain", domain);
  // if domain is not cms.k12.nc.us, redirect to sign-up page
  const isCmsDomain = domain === "cms.k12.nc.us";
  console.log("isCmsDomain", isCmsDomain);
  if (!isCmsDomain) {
    console.log("non-Cms domain, redirecting to sign-up page");
    redirect('/sign-up');
  } else {
    console.log("Cms domain, continuing");
    // is user in DB?   
    const client = new Client();
    try {
      await client.connect();
      const res = await client.query(
        `SELECT * FROM "users" WHERE "id" = '${primaryEmailAddressId}'`
      );
      const dbUser = res.rows[0];
      console.log("dbUser", dbUser);

      // if user doesn't exist then create entry in DB and redirect to application page
      if (dbUser === undefined) {
        console.log("user not in DB, create account and redirect to application page");
        const res = await client.query(
          // enter user into DB
          `INSERT INTO "users" ("id", "firstName", "lastName", "email") VALUES ('${primaryEmailAddressId}', '${firstName}', '${lastName}', '${emailAddress}') RETURNING *`
        );
        redirect('/application');
      }
      else {
        // if user exists, get role from DB
        const role = dbUser.role;
        if (role !== requiredRole) {
          console.log("user is not authorized, redirecting to application page");
          redirect('/application');
        } else {
          console.log("user is authorized, continuing");
        }
      }
    }
    catch (err) {
      console.error(err.message);
    }
    finally {
      await client.end();
    }
  }
}