import {NextResponse} from 'next/server';


export async function POST(request) {
    console.log(request);
    const data = await request.json();
    console.log('data: ', data);

    const {firstName, lastName, studentClass} = data;
    console.log(firstName);

    return NextResponse.json({firstName, lastName, studentClass});

}