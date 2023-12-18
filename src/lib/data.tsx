import { Client } from "pg";
import { student, testClass, user, testEvent } from "./definitions";
import { log } from "console";


export async function deleteTestClass(id: testClass["id"]): Promise<void> {
  log("deleting test class");
  const client = new Client();
  try {
    await client.connect();
    await client.query(
      `DELETE FROM "testClasses" WHERE "id" = '${id}'`
    );
  }
  catch (err) {
    console.error(err.message);
  }
  finally {
    await client.end();
  }
}

export async function createClass(testClass: testClass): Promise<void> {
  log("creating test class");
  const client = new Client();
  const { id, name, block, occurrence, teacher } = testClass;
  try {
    await client.connect();
    await client.query(
      `INSERT INTO "testClasses" ("id", "name", "block", "occurrence", "teacher") 
      VALUES ('${id}', '${name}', '${block}', '${occurrence}', '${teacher}')`
    );
  }
  catch (err) {
    console.error(err.message);
  }
  finally {
    await client.end();
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
    const res = await client.query(
      `SELECT * FROM users`
    );
    const users: Array<user> = res.rows;
    return users;
  }
  catch (err) {
    console.error(err.message);
  }
  finally {
    await client.end();
  }
}