import {NextResponse} from 'next/server';
import GetTestData from '@/lib/data';
import axios from 'axios';


export async function POST(request) {

    console.log(request);
    const form = await request.json();
    console.log('data: ', form);
    const {firstName, lastName, studentClass, teacher} = form;
    const studentObj = {name: `${firstName} ${lastName}`, }

    // get old students array for class
    const classes = await GetTestData(teacher);
    console.log(`classes for ${teacher}:`);
    console.log(classes);
    const chosenClass = classes.find((currClass) => {
        return currClass.name === studentClass;
    });
    console.log(chosenClass);

    // create new array with new students added
    const updatedStudents = [...chosenClass.students,  studentObj];

    console.log('updated students:');
    console.log(updatedStudents);
    console.log('updated class:');
    console.log({...chosenClass, students: updatedStudents});

    const updatedClass = {...chosenClass, students: updatedStudents};

    console.log(JSON.stringify(updatedClass));

    // FIXME this is responding with 404 and I'm not sure why as of 15:38 on 12/7/23

    // send patch request to update students property with new array
    try {
        const res = await axios.patch(`http://localhost:3001/testUnits?teacher=${teacher}&name=${studentClass}`, JSON.stringify(updatedClass));
        return new NextResponse(res.status);

    } catch (err) {
        console.log(err.message);
        return new NextResponse(err.message);
    }




    return NextResponse.json({firstName, lastName, studentClass, teacher});

}