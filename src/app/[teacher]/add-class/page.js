import GetTestData from "@/lib/data";
import AddClassForm from "./(components)/add-class-form";
import axios from "axios";


const defaultValue = {
  nameOfClass: '',
  block: '',
}

export default async function AddClass({ params }) {
  console.log("rerendering AddClass (server component)");
  let { teacher } = params;
  teacher = teacher.replace("%20", " ");
  // fetch teacherTestUnits from DB
  let testUnits = [];
  try {
    const testUnitsRes = await axios(` http://localhost:3001/testUnits?teacher=${teacher}`, {cache: "no-cache"});
    testUnits = testUnitsRes.data;
    console.log("testUnits", testUnits);
  } catch (err) {
    console.log(err);
  }

  return (
    <>
    <AddClassForm
    teacher={teacher}    
    />
    </>
  );
}
