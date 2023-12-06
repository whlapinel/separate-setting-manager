export default async function GetTestData(teacher) {

  console.log('GetTestData: teacher prop is:');

  console.log(teacher);

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
