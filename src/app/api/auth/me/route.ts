import { supabaseAdmin, getUserFromToken } from '@/lib/supabase';
import { updateProfileSchema, validateBody } from '@/lib/validations';
import { success, error, unauthorized, serverError } from '@/lib/api-response';

function getToken(request: Request): string | null {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;
  return authHeader.substring(7);
}

export async function GET(request: Request) {
  try {
    const token = getToken(request);
    if (!token) return unauthorized();

    const user = await getUserFromToken(token);
    if (!user) return unauthorized();

    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError) {
      return error('Perfil no encontrado', 404);
    }

    return success({
      id: user.id,
      email: user.email,
      ...profile,
    });

  } catch (err) {
    console.error('Get me error:', err);
    return serverError();
  }
}

export async function PATCH(request: Request) {
  try {
    const token = getToken(request);
    if (!token) return unauthorized();

    const user = await getUserFromToken(token);
    if (!user) return unauthorized();

    const body = await request.json();
    const validation = validateBody(updateProfileSchema, body);

    if (!validation.success) {
      return error(validation.error);
    }

    const { data: profile, error: updateError } = await supabaseAdmin
      .from('profiles')
      .update(validation.data)
      .eq('id', user.id)
      .select()
      .single();

    if (updateError) {
      return error('Error actualizando perfil');
    }

    return success(profile);

  } catch (err) {
    console.error('Update me error:', err);
    return serverError();
  }
}
