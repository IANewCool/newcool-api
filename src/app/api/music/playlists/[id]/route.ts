import { success, notFound, serverError } from '@/lib/api-response';
import { getPlaylist, getPlaylistTracks } from '@/lib/music-catalog';

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = await params;

    const playlist = getPlaylist(id);
    if (!playlist) {
      return notFound('Playlist no encontrada');
    }

    const tracks = getPlaylistTracks(id);

    return success({
      ...playlist,
      tracks,
    });

  } catch (err) {
    console.error('Get playlist error:', err);
    return serverError();
  }
}
