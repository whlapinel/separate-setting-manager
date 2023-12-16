import { Client } from "pg";

export async function testDB() {
  const client = new Client();
  await client.connect();

  try {
    const res = await client.query("SELECT $1::text as message", [
      "Hello world!"
    ]);
    console.log(res.rows[0].message); // Hello world!
    const res2 = await client.query("SELECT * FROM users WHERE id = '1'");
    console.log(res2.rows[0].role[0]);
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

export default async function GetTestData(teacher) {
  try {
    if (!teacher) {
      const res = await fetch(`http://localhost:3001/testUnits`);
      const testUnits = await res.json();
      return testUnits;
    }
    const res = await fetch(
      `http://localhost:3001/testUnits?teacher=${teacher}`
    );
    const testUnits = await res.json();
    return testUnits;
  } catch (err) {
    console.error(err.message);
  }
}
