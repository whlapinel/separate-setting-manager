import GetTestData from "@/lib/data";
import { NextResponse } from 'next/server';

export async function GET(request, {params}) {
    console.log('events route: GET');
    console.log("params", params);
    const {teacher, classID} = params;
    console.log("teacher", teacher);
    console.log("unitID", classID);

    const testUnits = await GetTestData(teacher);
    console.log("testUnits", testUnits);
    const chosenClass = testUnits.find((currClass) => {
      return currClass.name === classID;
    });
    console.log("chosenClass", chosenClass);
    const testEvents = chosenClass?.testEvents;
    console.log("students", testEvents);
    return new NextResponse(testEvents);
  }