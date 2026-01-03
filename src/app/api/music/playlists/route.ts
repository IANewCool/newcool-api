import { success, serverError } from '@/lib/api-response';
import { playlists } from '@/lib/music-catalog';

export async function GET() {
  try {
    const publicPlaylists = playlists.filter(p => p.isPublic);

    return success({
      playlists: publicPlaylists.map(p => ({
        id: p.id,
        name: p.name,
        description: p.description,
        coverUrl: p.coverUrl,
        trackCount: p.tracks.length,
      })),
    }, { total: publicPlaylists.length });

  } catch (err) {
    console.error('Playlists error:', err);
    return serverError();
  }
}
