import StudentList from "@/app/[teacher]/my-students/(components)/student-list";
import GetTestData from "@/lib/data";
import Buttons from "./(components)/buttons";
import UnitList from "./(components)/unit-list";
import { revalidatePath } from "next/cache";
import Navigation from "next/navigation";
import { redirect } from "next/navigation";
import axios from "axios";

export default async function MyStudents({ searchParams, params }) {
  console.log("rerendering MyStudents (server component)");
  let testUnits = [];
  let { teacher } = params;
  teacher = teacher.replace("%20", " ");
  // fetch teacherTestUnits from DB
  try {
    const testUnitsRes = await axios(` http://localhost:3001/testUnits?teacher=${teacher}`, {cache: "no-cache"});
    testUnits = testUnitsRes.data;
    console.log("testUnits", testUnits);
  } catch (err) {
    console.log(err);
  }
  if (!teacher) {
    return <p>no user selected</p>;
  } else {
    return (
      <>
        <UnitList testUnits={testUnits} teacher={teacher}/>
      </>
    );
  }
}
