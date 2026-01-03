import { musicQuerySchema, validateBody } from '@/lib/validations';
import { success, error, serverError } from '@/lib/api-response';
import { tracks, albums, genres, getStats, searchMusic } from '@/lib/music-catalog';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams.entries());

    // Stats endpoint
    if (params.stats === 'true') {
      return success(getStats());
    }

    const validation = validateBody(musicQuerySchema, params);
    if (!validation.success) {
      return error(validation.error);
    }

    const { genre, artist, limit, offset } = validation.data;

    let results = [...tracks];

    // Filter by genre
    if (genre) {
      results = results.filter(t => t.genre === genre);
    }

    // Filter by artist
    if (artist) {
      results = results.filter(t =>
        t.artist.toLowerCase().includes(artist.toLowerCase())
      );
    }

    // Paginate
    const total = results.length;
    results = results.slice(offset, offset + limit);

    return success({
      tracks: results,
      genres,
      albums: albums.map(a => ({ id: a.id, title: a.title, artist: a.artist, coverUrl: a.coverUrl })),
    }, { total, limit, offset });

  } catch (err) {
    console.error('Music error:', err);
    return serverError();
  }
}
