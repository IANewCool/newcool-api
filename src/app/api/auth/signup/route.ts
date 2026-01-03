import { supabaseAdmin } from '@/lib/supabase';
import { signupSchema, validateBody } from '@/lib/validations';
import { success, error, serverError } from '@/lib/api-response';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = validateBody(signupSchema, body);

    if (!validation.success) {
      return error(validation.error);
    }

    const { email, password, username, country_code } = validation.data;

    // Check if username is taken
    const { data: existingUser } = await supabaseAdmin
      .from('profiles')
      .select('username')
      .eq('username', username)
      .single();

    if (existingUser) {
      return error('Username ya está en uso');
    }

    // Create auth user
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        username,
        country_code,
      },
    });

    if (authError) {
      return error(authError.message);
    }

    // Create profile
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert({
        id: authData.user.id,
        username,
        email,
        country_code,
        display_name: username,
      });

    if (profileError) {
      // Rollback: delete auth user
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      return error('Error creando perfil');
    }

    return success({
      user: {
        id: authData.user.id,
        email: authData.user.email,
        username,
      },
      message: 'Usuario creado exitosamente',
    });

  } catch (err) {
    console.error('Signup error:', err);
    return serverError();
  }
}
