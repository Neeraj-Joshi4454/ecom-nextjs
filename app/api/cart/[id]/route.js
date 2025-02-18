import { NextResponse } from "next/server";
import { connectToDatabase } from "@/config/database";
import Cart from "@/models/cartModel";

export async function PUT(req, { params }) {
    await connectToDatabase();
    
    const { id } = params;
    const { quantity } = await req.json();
    
    try {
        const cart = await Cart.findOneAndUpdate(
            { "items._id": id },
            { $set: { "items.$.quantity": quantity } },
            { new: true }
        );

        if (!cart) {
            return NextResponse.json({ success: false, error: "Cart item not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: cart }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    await connectToDatabase();
    
    const { id } = params;

    try {
        const cart = await Cart.findOneAndUpdate(
            { "items._id": id },
            { $pull: { items: { _id: id } } },
            { new: true }
        );

        if (!cart) {
            return NextResponse.json({ success: false, error: "Cart item not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Item removed from cart" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
