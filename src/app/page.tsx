import Link from "next/link";
import GetTestData, { testDB } from "@/lib/data";
import { main } from "@/lib/index";

export default async function Home({ params }) {

  await testDB();
  await main();


  const testUnits = await GetTestData();

  
  const testUnitsSet = new Set(testUnits.map((unit) => unit.teacher)); // this is a set of all the teachers
  console.log(testUnitsSet); 
  const setToArray = [...testUnitsSet]; // this is an array of all the teachers
  console.log(setToArray);
  const teacherList = setToArray.map((teacher) => {
    return (
      <Link
        href={`/${teacher}/my-classes`}
        teacher={teacher}
        key={teacher}
      >
        {teacher}
      </Link>
    );
  });

  return (
    <main>
      <h3>
        "Log in" (Select Teacher from list)
      </h3>
        <div className="teacher-list-container">{teacherList}</div>
    </main>
  );
}
