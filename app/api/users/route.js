import User from "@/models/userModel";
import verifyToken from "@/utils/verfiyToken";
import { NextResponse } from "next/server"

export async function GET(request, context){
    const user = await verifyToken(request);
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    try{
        const users = await User.find();
        return NextResponse.json({success: true, data: users}, {status: 200})
    }catch(error){
        return NextResponse.json({success: false, error: error.message}, {status: 500})
    }
}