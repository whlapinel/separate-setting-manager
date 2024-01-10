import { Client } from "pg";
import { student, testClass, user, testEvent, tableName, status, role } from "./definitions";
import { log } from "console";
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: "postgres://default:ZafC6OdkJ9MT@ep-misty-snow-50259301-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require",
})

export async function getPendingApplications(): Promise<any> {
  log("getting pending applications");
  const client = new Client();
  try {
    await client.connect();
    const res = await client.query(
      `SELECT * FROM "users" where "pending_roles" != '{}'`
    );
    const pendingApplications: Array<user> = res.rows;
    return pendingApplications;
  }
  catch (err) {
    console.error(err.message);
  }
  finally {
    await client.end();
  }
}

export async function getRoles(userID: string): Promise<Array<role>> {
  const client = new Client();
  let status: status;
  try {

      await client.connect();

      const res = await client.query(
          `SELECT roles FROM users WHERE id = '${userID}'`,
      );
      console.log(res.rows[0]);
      status = "success";
      return res.rows[0].roles;
  } catch (err) {
      console.log(err);
      status = "error";
  }
  finally {
      await client.end();
      console.log(status);
  }
}




export async function getPendingRoles(userID: string): Promise<Array<string>> {
  const client = new Client();
  let status: status;
  try {

      await client.connect();

      const res = await client.query(
          `SELECT pending_roles FROM users WHERE id = '${userID}'`,
      );
      console.log(res.rows[0]);
      status = "success";
      return res.rows[0].pending_roles;
  } catch (err) {
      console.log(err);
      status = "error";
  }
  finally {
      await client.end();
      console.log(status);
  }
}


export async function editStudent(changedStudent: Partial<student>): Promise<string> {
  log("editing student");
  const client = new Client();
  const { id, firstName, lastName } = changedStudent;
  console.log('changedStudent', changedStudent);

  let status: status;
  try {
    await client.connect();
    await client.query(
      `UPDATE "students" SET "firstName" = '${firstName}', "lastName" = '${lastName}' 
      WHERE "id" = '${id}'`
    );
    status = "success";
  }
  catch (err) {
    status = err.message;
  }
  finally {
    await client.end();
    console.log('status (logged from editStudent()', status);
    return status;
  }
}

export async function createTestEvent(newTestEvent: testEvent): Promise<string> {
  log("creating test event");
  const client = new Client();
  const { id, testName, testDate, testClass } = newTestEvent;
  let status: string;
  try {
    await client.connect();
    await client.query(
      `INSERT INTO "testEvents" ("id", "testName", "testDate", "testClass") 
      VALUES ('${id}', '${testName}', '${testDate}', '${testClass}')`
    );
    status = "success";
  }
  catch (err) {
    console.error(err.message);
    status = err.message;
  }
  finally {
    await client.end();
    return status;
  }
}

export async function editClass(changedClass: Partial<testClass>): Promise<string> {
  log("editing class");
  const client = new Client();
  const { id, name, block, occurrence } = changedClass;
  let status: string;
  try {
    await client.connect();
    await client.query(
      `UPDATE "testClasses" SET "name" = '${name}', "block" = '${block}', "occurrence" = '${occurrence}' WHERE "id" = '${id}'`
    );
    status = "success";
  }
  catch (err) {
    console.error(err.message);
    status = err.message;
  }
  finally {
    await client.end();
    return status;
  }

}

export async function getUserByID(userID: string): Promise<any> {
  log("getting user");
  const client = new Client();
  try {
    await client.connect();
    const res = await client.query(
      `SELECT * FROM "users" WHERE "id" = '${userID}'`
    );
    const user: user = res.rows[0];
    return user;
  }
  catch (err) {
    console.error(err.message);
  }
  finally {
    await client.end();
  }
}


export async function getTestClassByID(testClassID: string): Promise<any> {
  log("getting test class");
  const client = new Client();
  try {
    await client.connect();
    const res = await client.query(
      `SELECT * FROM "testClasses" WHERE "id" = '${testClassID}'`
    );
    const testClass: testClass = res.rows[0];
    return testClass;
  }
  catch (err) {
    console.error(err.message);
  }
  finally {
    await client.end();
  }


}

export async function deleteItem(id: string, tableName: tableName): Promise<void> {
  log(`deleting ${tableName}`);
  const client = new Client();
  try {
    await client.connect();
    log(`DELETE FROM "${tableName}" WHERE "id" = '${id}'`);
    await client.query(
      `DELETE FROM "${tableName}" WHERE "id" = '${id}'`
    );
  }
  catch (err) {
    console.error(err.message);
  }
  finally {
    await client.end();
  }
}

export async function createStudent(newStudent: student): Promise<string> {
  log("creating test class");
  const client = new Client();
  const { id, firstName, lastName, testClass } = newStudent;
  let status: string;
  try {
    await client.connect();
    await client.query(
      `INSERT INTO "students" ("id", "firstName", "lastName", "testClass") 
      VALUES ('${id}', '${firstName}', '${lastName}', '${testClass}')`
    );
    status = "success";
  }
  catch (err) {
    console.error(err.message);
    status = err.message;
  }
  finally {
    await client.end();
    return status;
  }
}


export async function createClass(newTestClass: testClass): Promise<string> {
  log("creating test class");
  const client = new Client();
  const { id, name, block, occurrence, teacher } = newTestClass;
  let status: string;
  try {
    await client.connect();
    await client.query(
      `INSERT INTO "testClasses" ("id", "name", "block", "occurrence", "teacher") 
      VALUES ('${id}', '${name}', '${block}', '${occurrence}', '${teacher}')`
    );
    status = "Class Added!";
  }
  catch (err) {
    console.error(err.message);
    status = err.message;
  }
  finally {
    await client.end();
    return status;
  }
}

export async function getTestEvents(testClassID?: string, date?: Date): Promise<any> {
  log("getting test events");
  const client = new Client();

  // if only a date is provided, return all events on that date
  if (!testClassID && date) {
    try {
      await client.connect();
      const res = await client.query(
        `SELECT * FROM "testEvents" WHERE "testDate" = '${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}'`
      );
      const testEvents: Array<testEvent> = res.rows;
      return testEvents;
    } catch (error) {
      console.error(error.message);
    }
    finally {
      await client.end();
    }
  }

  // if no testClassID or date is provided, return all testEvents
  if (!testClassID && !date) {
    try {
      await client.connect();
      const res = await client.query(
        `SELECT * FROM "testEvents"
        ORDER BY "testDate" ASC`
      );
      const testEvents: Array<testClass> = res.rows;
      return testEvents;
    }
    catch (err) {
      console.error(err.message);
    }
    finally {
      await client.end();
    }
  }

  // if a testClassID is provided, return only testEvents for that class
  if (testClassID) {
    try {
      await client.connect();
      const res = await client.query(
        `SELECT * FROM "testEvents" WHERE "testClass" = '${testClassID}'
        ORDER BY "testDate" ASC`
      );
      const testEvents: Array<testClass> = res.rows;
      return testEvents;
    }
    catch (err) {
      console.error(err.message);
    }
    finally {
      await client.end();
    }
  }
}

export async function getStudents(testClassID: string): Promise<any> {
  log("getting students");
  const client = new Client();
  try {
    await client.connect();
    const res = await client.query(
      `SELECT * FROM "students" WHERE "testClass" = '${testClassID}'`
    );
    const students: Array<student> = res.rows;
    return students;
  }
  catch (err) {
    console.error(err.message);
  }
  finally {
    await client.end();
  }
}

export async function getClasses(teacherID?: user['id']): Promise<any> {
  log("getting classes");
  const client = new Client();
  try {
    await client.connect();
    const res = await client.query(
      `SELECT * FROM "testClasses" WHERE "teacher" = '${teacherID}'`
    );
    const testClasses: Array<testClass> = res.rows;
    return testClasses;
  }
  catch (err) {
    console.error(err.message);
  }
  finally {
    await client.end();
  }
}

export async function getUsers(userID?: string): Promise<any> {
  log("getting users");
  const client = new Client();
  try {
    await client.connect();
    if (userID) {
      const res = await client.query(
        `SELECT * FROM "users" WHERE "id" = '${userID}'`
      );
      const users: Array<user> = res.rows;
      return users;
    } else {
      const res = await client.query(
        `SELECT * FROM users`
      );
      const users: Array<user> = res.rows;
      return users;
    }
  }
  catch (err) {
    console.error(err.message);
  }
  finally {
    await client.end();
  }
}