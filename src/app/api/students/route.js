import {NextResponse} from 'next/server';
import GetTestData from '@/lib/data';
import axios from 'axios';
import { revalidatePath } from 'next/cache';


export async function POST(request) {
    revalidatePath('/', 'layout');
    const form = await request.json();
    console.log('form: ', form);
    const {firstName, lastName, studentClass, teacher} = form;
    const studentObj = {name: `${firstName} ${lastName}`}

    // get old students array for class
    const classes = await GetTestData(teacher);
    console.log(`classes for ${teacher}:`);
    console.log(classes);
    const chosenClass = classes.find((currClass) => {
        return currClass.name === studentClass;
    });
    console.log(chosenClass);


    const {id} = chosenClass;
    let updatedStudents = [];

    if (!chosenClass.students) {
        updatedStudents = [studentObj];
    } else {
        updatedStudents = [...chosenClass.students, studentObj];
    }

    // send patch request to update students property with new array
    try {
        const res = await axios.patch(`http://localhost:3001/testUnits/${id}`, {students: updatedStudents});
        console.log(res);
        return new NextResponse(res.status);

    } catch (err) {
        console.log(err.message);
        return new NextResponse(err.message);
    }




    return NextResponse.json({firstName, lastName, studentClass, teacher});

}