import {NextResponse} from 'next/server';
import GetTestData from '@/lib/data';
import axios from 'axios';
import { revalidatePath } from 'next/cache';
import { add } from 'date-fns';


export async function PATCH(request) {
    revalidatePath('/', 'layout');

    const form = await request.json();
    console.log('form: ', form);

    // destructure form data
    let {teacher, testClass, testName, testDate} = form;

    // convert test date to date object
    let testDateObj = new Date(testDate);

    console.log(testDateObj);
    const offset = testDateObj.getTimezoneOffset();

    console.log(offset);

    testDateObj = testDateObj = add(testDateObj, {minutes: offset});

    console.log(testDateObj);

    testDate = testDateObj.toDateString();



    // create new test event object
    const testObj = {testName, testDate};

    // get class object using class name
    const classes = await GetTestData(teacher);

    const chosenClass = classes.find((currClass) => {
        return currClass.name === testClass;
    });

    let updatedTestEvents = [];

    // is testevents property null?
    if (!chosenClass.testEvents) {
        updatedTestEvents = [testObj];
    } else {
        updatedTestEvents = [...chosenClass.testEvents, testObj];
    }

    try {
        const res = await axios.patch(`http://localhost:3001/testUnits/${chosenClass.id}`, {testEvents: updatedTestEvents});
        console.log(res);
        return new NextResponse(res.status);
    } catch (err) {
        console.log(err);
        return new NextResponse(err.message);
    }
}