import GetTestData from "@/lib/data";

export default async function AddClass({ params }) {
  let { teacher } = params;
  teacher = teacher.replace("%20", " ");
  const testUnits = await GetTestData(teacher);


  return (
    <>
      <h3>Add Class</h3>

    </>
  );
}
