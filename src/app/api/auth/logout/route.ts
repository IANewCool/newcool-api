import { supabase } from '@/lib/supabase';
import { success, serverError } from '@/lib/api-response';

export async function POST() {
  try {
    await supabase.auth.signOut();
    return success({ message: 'Sesión cerrada' });
  } catch (err) {
    console.error('Logout error:', err);
    return serverError();
  }
}
