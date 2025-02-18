import User from "@/models/userModel";
import verifyToken from "@/utils/verfiyToken";
import { NextResponse } from "next/server";

export async function GET(request, context) {
  const user = await verifyToken(request);
  if (!user) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = context.params;

  try {
    const foundUser = await User.findById(id);
    if (!foundUser) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: foundUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request, context) {
    const user = await verifyToken(request);
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
  
    const { id } = context.params;
    const { first_name, last_name, email, password, role } = await request.json();
  
    try {
      const updatedUser = await User.findByIdAndUpdate(id, {
        first_name,
        last_name,
        email,
        password,
        role
      }, { new: true });
  
      if (!updatedUser) {
        return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
      }
  
      return NextResponse.json({ success: true, data: updatedUser }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }

  export async function DELETE(request, context) {
    const user = await verifyToken(request);
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
  
    const { id } = context.params;
  
    try {
      const deletedUser = await User.findByIdAndDelete(id);
  
      if (!deletedUser) {
        return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
      }
  
      return NextResponse.json({ success: true, message: 'User deleted successfully' }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }