import { getUserID } from "@/lib/authorization";
import UnitContainer from "./(components)/(server components)/unit-container";

export default async function ClassDetails({params}) {

    const userID = await getUserID();
    const {classID} = params;

    return <UnitContainer classID={classID} userID={userID}/>
}