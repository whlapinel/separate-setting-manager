import StudentList from "@/app/[teacher]/my-students/(components)/student-list";
import GetTestData from "@/lib/data";
import Buttons from "./(components)/buttons";
import UnitList from "./(components)/unit-list";
import { revalidatePath } from "next/cache";
import Navigation from "next/navigation";
import { redirect } from "next/navigation";

export default async function MyStudents({ searchParams, params }) {
  console.log("rerendering MyStudents");
  let testUnits = [];
  let { teacher } = params;
  teacher = teacher.replace("%20", " ");
  testUnits = await GetTestData(teacher);

  if (!teacher) {
    return <p>no user selected</p>;
  } else {
    return (
      <>
        <UnitList testUnits={testUnits} teacher={teacher} />
      </>
    );
  }
}
