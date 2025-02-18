import { connectToDatabase } from "@/config/database";
import PasswordReset from "@/models/passwordResetModel";
import User from "@/models/userModel";
import { sendResetEmail } from "@/utils/nodemailer";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(request, context){
    await connectToDatabase();
    const req = await request.json();
    const {email} = req;

    const user = await User.findOne({email})
    if(!user){
        return NextResponse.json({message: "user does not exist"}, {status: 404});
    }
    const token = crypto.randomBytes(20).toString("hex");
    const expiresAt = new Date(Date.now() + 3600000)

    await PasswordReset.create({userId: user._id, token , expiresAt})
    await sendResetEmail(email,token);

    return NextResponse.json({message : "password reset link sent to your email"});
}