import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = req.cookies.get('auth_token');
  console.log('token ', token)

  const url = req.url;
  if (!token && (url.includes('/products') || url.includes('/cart') || url.includes('/orders'))) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.next();  
  } catch (error) {
    return NextResponse.redirect(new URL('/signin', req.url)); 
  }
}

export const config = {
  matcher: [],
};
