import {NextResponse} from 'next/server';

export async function GET(request) {
    console.log(request.url);
    const {searchParams} = new URL(request.url);


    console.log(searchParams);

    console.log(searchParams.entries());

    const obj = Object.fromEntries(searchParams.entries());

    console.log(obj);

    return NextResponse.json(obj);
}