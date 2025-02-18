import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/config/database';
import Product from '@/models/productModel';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';

export async function POST(req) {
  try {
    await connectToDatabase();
    
    const formData = await req.formData();
    const name = formData.get('name');
    const description = formData.get('description');
    const price = formData.get('price');
    const image = formData.get('image');

    if (!name || !description || !price || !image) {
      return NextResponse.json({ success: false, error: 'All fields are required' }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), 'public/uploads');
    await mkdir(uploadDir, { recursive: true });

    const filename = `uploads/${Date.now()}-${image.name}`;
    const filePath = path.join(process.cwd(), 'public', filename);
    const buffer = Buffer.from(await image.arrayBuffer());

    await writeFile(filePath, buffer);
    const product = new Product({
      name,
      description,
      price,
      image: `/${filename}`,
    });

    await product.save();

    return NextResponse.json({ success: true, data: product }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(req){
    try{
        const allProducts = await Product.find();
        return NextResponse.json({success: true, data:allProducts}, {status: 200});
    }catch(error){
        return NextResponse.json({success: false, error:error.message}, {status : 500})
    }
}

