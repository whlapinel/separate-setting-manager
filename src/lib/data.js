
export default async function GetTestData() {
    const res = await fetch('http://localhost:3001/testUnits');
    console.log(res);
    const data = await res.json();
    console.log(data);

    return(
        data[0].teacher
    );
}