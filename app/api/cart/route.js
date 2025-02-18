import { NextResponse } from "next/server";
import { connectToDatabase } from "@/config/database";
import Cart from "@/models/cartModel";
import Product from "@/models/productModel";
import verifyToken from "@/utils/verfiyToken";

export async function GET(req) {
    const user = await verifyToken(req);
    if (!user) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    
    const userId = req.headers.get("userId"); 
    if (!userId) {
        return NextResponse.json({ success: false, error: "User not authenticated" }, { status: 401 });
    }

    try {
        const cart = await Cart.findOne({ userId }).populate("items.productId");
        return NextResponse.json({ success: true, data: cart || { userId, items: [] } }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    await connectToDatabase();
    
    const { userId, productId, quantity } = await req.json();
    if (!userId || !productId || !quantity) {
        return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [{ productId, quantity }] });
        } else {
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ productId, quantity });
            }
        }

        await cart.save();
        return NextResponse.json({ success: true, data: cart }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
