import { success, serverError } from '@/lib/api-response';
import { albums } from '@/lib/music-catalog';

export async function GET() {
  try {
    return success({
      albums: albums.map(a => ({
        id: a.id,
        title: a.title,
        artist: a.artist,
        genre: a.genre,
        subject: a.subject,
        coverUrl: a.coverUrl,
        trackCount: a.tracks.length,
        releaseDate: a.releaseDate,
      })),
    }, { total: albums.length });

  } catch (err) {
    console.error('Albums error:', err);
    return serverError();
  }
}
