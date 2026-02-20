import { createClient } from '@/lib/supabase/server';

/**
 * Get the current authenticated user (server-side)
 */
export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/**
 * Sign up with email and password
 */
export async function signUp(email: string, password: string) {
  const supabase = await createClient();
  return supabase.auth.signUp({ email, password });
}

/**
 * Sign in with email and password
 */
export async function signIn(email: string, password: string) {
  const supabase = await createClient();
  return supabase.auth.signInWithPassword({ email, password });
}

/**
 * Sign out the current user
 */
export async function signOut() {
  const supabase = await createClient();
  return supabase.auth.signOut();
}
