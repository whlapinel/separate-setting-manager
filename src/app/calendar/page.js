import GetTestData from "@/lib/data"

export default async function Calendar() {
    
    const testData = await GetTestData();

    return (
        <>
        <h2>This is the Calendar Page!</h2>
        <h3>{testData}</h3>
        </>
    )
}