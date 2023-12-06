import {NextResponse} from 'next/server';


export async function POST(request) {
    console.log(request);
    const data = await request.json();
    console.log('data: ', data);

    const {nameOfClass, block} = data;
    console.log(nameOfClass);

    return NextResponse.json({nameOfClass, block});

}