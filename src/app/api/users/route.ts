import { supabaseAdmin } from '@/lib/supabase';
import { success, error, serverError } from '@/lib/api-response';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = supabaseAdmin
      .from('profiles')
      .select('id, username, display_name, avatar_url, is_verified, is_creator', { count: 'exact' });

    if (username) {
      query = query.ilike('username', `%${username}%`);
    }

    const { data: users, error: queryError, count } = await query
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false });

    if (queryError) {
      return error('Error buscando usuarios');
    }

    return success(users, { total: count || 0, limit, offset });

  } catch (err) {
    console.error('List users error:', err);
    return serverError();
  }
}
