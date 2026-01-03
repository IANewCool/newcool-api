import { success, notFound, serverError } from '@/lib/api-response';
import { getAlbum, getAlbumTracks } from '@/lib/music-catalog';

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = await params;

    const album = getAlbum(id);
    if (!album) {
      return notFound('Album no encontrado');
    }

    const tracks = getAlbumTracks(id);

    return success({
      ...album,
      tracks,
    });

  } catch (err) {
    console.error('Get album error:', err);
    return serverError();
  }
}
