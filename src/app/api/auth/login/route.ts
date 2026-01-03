import { supabase } from '@/lib/supabase';
import { loginSchema, validateBody } from '@/lib/validations';
import { success, error, serverError } from '@/lib/api-response';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = validateBody(loginSchema, body);

    if (!validation.success) {
      return error(validation.error);
    }

    const { email, password } = validation.data;

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      return error('Credenciales inválidas', 401);
    }

    return success({
      user: {
        id: data.user.id,
        email: data.user.email,
      },
      session: {
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
        expires_at: data.session.expires_at,
      },
    });

  } catch (err) {
    console.error('Login error:', err);
    return serverError();
  }
}
