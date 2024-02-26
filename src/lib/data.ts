import { Client, QueryResultRow } from "pg";
import { student, testClass, user, testEvent, tableName, status, role } from "./definitions";
import { log } from "console";
import { Pool } from 'pg'
import { sql } from "@vercel/postgres"
import { sq } from "date-fns/locale";
import { stat } from "fs";


export async function getPendingApplicationsAlt(): Promise<QueryResultRow> {
  const { rows }: { rows: Array<user> } = await sql`SELECT * FROM "users" where "pending_roles" != '{}'`;
  return rows;
}


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

export async function editClass(changedClass: Partial<testClass>): Promise<void> {
  const { id, name, block, occurrence } = changedClass;
  const { rows } = await sql`UPDATE "testClasses" SET "name" = '${name}', "block" = '${block}', "occurrence" = '${occurrence}' WHERE "id" = '${id}'`
    ;
}

export async function getUserByID(userID: string): Promise<user> {
  const { rows }: { rows: Array<user> } = await sql`SELECT * FROM "users" where "id" = ${userID}`;
  return rows[0];
}



export async function getTestClassByID(testClassID: string): Promise<any> {
  const { rows } = await sql`SELECT * FROM "testClasses" where "id" = ${testClassID}`;
  return rows[0];
}

export async function deleteItem(id: string, tableName: tableName): Promise<void> {
  log(`deleting ${tableName}`);
  sql`DELETE FROM ${tableName} WHERE id = ${id}`;
}

export async function createStudent(newStudent: student): Promise<void> {
  const { id, firstName, lastName, testClass } = newStudent;
  await sql
    `INSERT INTO "students" ("id", "firstName", "lastName", "testClass") 
      VALUES ('${id}', '${firstName}', '${lastName}', '${testClass}')`;
}

export async function createClass(newTestClass: testClass): Promise<void> {
  log("creating test class");
  const { id, name, block, occurrence, teacher } = newTestClass;
  await sql
    `INSERT INTO "testClasses" ("id", "name", "block", "occurrence", "teacher") 
      VALUES ('${id}', '${name}', '${block}', '${occurrence}', '${teacher}')`
    ;
}

export async function getTestEvents(testClassID?: string, date?: Date): Promise<Array<testEvent>> {

  // if only a date is provided, return all events on that date
  if (!testClassID && date) {
    const { rows }: { rows: Array<testEvent> } =
      await sql
        `SELECT * FROM "testEvents" WHERE "testDate" = '${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}'`
      ;
    return rows;
  }

  // if no testClassID or date is provided, return all testEvents
  if (!testClassID && !date) {
    const { rows }: { rows: Array<testEvent> } = await sql
      `SELECT * FROM "testEvents"
        ORDER BY "testDate" ASC`
      ;
    return rows;
  }


  // if a testClassID is provided, return only testEvents for that class
  if (testClassID) {
    const { rows }: { rows: Array<testEvent> } = await sql
      `SELECT * FROM "testEvents" WHERE "testClass" = '${testClassID}'
        ORDER BY "testDate" ASC`
      ;
    return rows;
  }
}

export async function getStudents(testClassID: string): Promise<Array<student>> {
  const { rows }: { rows: Array<student> } = await sql`SELECT * FROM "students" WHERE "testClass" = '${testClassID}'`
    ;
  return rows;
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