import { connectToDatabase } from "@/config/database";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";


export async function POST (request, context){
    await connectToDatabase();
    const req = await request.json();
    const {email, password} = req;
    const user = await User.findOne({email});

    if(!user) return NextResponse.json({message: "user not found"}, {status: 404});
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) return NextResponse.json({message : "invalid credentials"}, {status: 403});

    const token = jwt.sign({id:user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: "1h"})
    return NextResponse.json({token, userId : user._id, userRole:user.role, name:`${user.first_name +" "+user.last_name}`})
}
