import GetTestData from "@/lib/data";
import AddClassForm from "./(components)/add-class-form";


const defaultValue = {
  nameOfClass: '',
  block: '',
}

export default async function AddClass({ params }) {
  let { teacher } = params;
  teacher = teacher.replace("%20", " ");
  const testUnits = await GetTestData(teacher);

  return (
    <>
    <AddClassForm
    teacher={teacher}
    />
    </>
  );
}
