import { connectToDatabase } from "@/config/database";
import User from "@/models/userModel";
import bcrypt from 'bcryptjs';
import { NextResponse } from "next/server";

export async function POST(request, context){
    await connectToDatabase();
    let req = await request.json();
    const {first_name, last_name, email , password} = req;
    console.log('request : ', req)

    if (!first_name || !last_name || !email || !password) {
        return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const hadhedPassword = await bcrypt.hash(password, 10);
    try{
        const newUser = await User.create({first_name , last_name, email, password:hadhedPassword});
         return NextResponse.json({ message: "User registered successfully", user: newUser }, { status: 201 });
    }catch(error){
        return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
    }

    }
    