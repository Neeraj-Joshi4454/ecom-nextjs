import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const tokenObj = req.cookies.get('auth_token'); // Get token object
  const token = tokenObj?.value; // Extract value safely

  console.log('Extracted Token:', token);

  const url = req.nextUrl.pathname;

  if (!token && (url.includes('/products') || url.includes('/cart') || url.includes('/orders'))) {
    console.log('No token found, redirecting to signin');
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  try {
    // Decode and verify JWT using `jose`
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);

    console.log('Token verified successfully');
    return NextResponse.next();
  } catch (error) {
    console.error('JWT Verification Error:', error.message);
    return NextResponse.redirect(new URL('/signin', req.url));
  }
}

export const config = {
  matcher: ['/products', '/cart', '/orders', '/createproduct'],
};

