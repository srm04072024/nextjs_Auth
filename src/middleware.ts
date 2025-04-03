
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    
    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail';
    
    const token = request.cookies.get("token")?.value || '';



// Already Logged in and has Token then redirect to profile page
    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/profile', request.url))
    }


// doesn't Logged in and doesn't have Token then redirect to login page
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', request.url))
    }
//   return NextResponse.redirect(new URL('/', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher:['/','/login','/signup','/profile','/verifyemail','/profile/:id*']
}