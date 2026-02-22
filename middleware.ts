import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/proxy';

// Middleware to refresh auth session and validate tokens
export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

// Routes that should go through middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
