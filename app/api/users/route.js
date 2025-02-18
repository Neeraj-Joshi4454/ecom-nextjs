import { NextResponse } from "next/server"

export async function GET(request, context){
    return NextResponse.json({message : "hello from next.js server"})
}