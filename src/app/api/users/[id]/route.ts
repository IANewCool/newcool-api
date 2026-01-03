import { supabaseAdmin } from '@/lib/supabase';
import { success, error, notFound, serverError } from '@/lib/api-response';

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = await params;

    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('id, username, display_name, avatar_url, is_verified, is_creator, created_at')
      .eq('id', id)
      .single();

    if (profileError || !profile) {
      return notFound('Usuario no encontrado');
    }

    return success(profile);

  } catch (err) {
    console.error('Get user error:', err);
    return serverError();
  }
}
