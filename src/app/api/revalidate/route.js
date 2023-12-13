import { revalidatePath } from "next/cache";
import { NextResponse } from 'next/server';

export async function GET(request) {
    console.log('revalidate route: GET');
    revalidatePath('/', 'layout');
    console.log('path revalidated');
    return new NextResponse(200);
}