export default async function GetTestData() {
  const res = await fetch("http://localhost:3001/testUnits");
  console.log(res);
  const testUnits = await res.json();
  console.log(testUnits);

  return testUnits;
}
