import { success, notFound, serverError } from '@/lib/api-response';
import { getTrack, incrementPlays } from '@/lib/music-catalog';

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = await params;

    const track = getTrack(id);
    if (!track) {
      return notFound('Track no encontrado');
    }

    return success(track);

  } catch (err) {
    console.error('Get track error:', err);
    return serverError();
  }
}

// POST to increment play count
export async function POST(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json().catch(() => ({}));

    const action = body.action || 'play';

    if (action === 'play') {
      const track = incrementPlays(id);
      if (!track) {
        return notFound('Track no encontrado');
      }
      return success({ plays: track.plays });
    }

    return success({ message: 'OK' });

  } catch (err) {
    console.error('Track action error:', err);
    return serverError();
  }
}
