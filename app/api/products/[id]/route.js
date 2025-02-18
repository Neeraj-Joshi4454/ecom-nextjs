import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/config/database';
import Product from '@/models/productModel';

export async function GET(request, { params }) {
    await connectToDatabase();
    const { id } = params;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: product }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    await connectToDatabase();
    const { id } = params;
    
    try {
        const body = await request.json();
        const updatedProduct = await Product.findByIdAndUpdate(id, body, { new: true, runValidators: true });

        if (!updatedProduct) {
            return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedProduct }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    await connectToDatabase();
    const { id } = params;
    
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Product deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
