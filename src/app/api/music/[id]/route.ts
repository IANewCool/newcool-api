import { success, notFound, serverError } from '@/lib/api-response';

// Mock track data
const mockTracks: Record<string, {
  id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  duration: number;
  url: string;
  lyrics?: string;
}> = {
  '1': {
    id: '1',
    title: 'Tablas del Reggaetón - Tabla del 2',
    artist: 'NewCool Edu',
    album: 'Matemáticas Bailables',
    genre: 'reggaeton',
    duration: 180,
    url: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/music/tablas-2.mp3',
    lyrics: `[Coro]
Dos por uno, dos (¡dos!)
Dos por dos, cuatro (¡cuatro!)
Dos por tres son seis
Y dos por cuatro, ocho

[Verso]
La tabla del dos es fácil de aprender
Solo tienes que sumar y entender
Que cada número que ves
Se duplica otra vez`,
  },
};

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = await params;

    const track = mockTracks[id];
    if (!track) {
      return notFound('Track no encontrado');
    }

    return success(track);

  } catch (err) {
    console.error('Get track error:', err);
    return serverError();
  }
}
