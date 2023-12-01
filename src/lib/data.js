export default async function GetTestData() {
  try {
  const res = await fetch(`http://localhost:3001/testUnits`);
  const testUnits = await res.json();
  return testUnits;
  } 
  catch (err) {
    console.error(err.message);
  }
}
