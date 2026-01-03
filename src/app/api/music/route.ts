import { musicQuerySchema, validateBody } from '@/lib/validations';
import { success, error, serverError } from '@/lib/api-response';

// Mock music catalog - will connect to S3/database later
const mockCatalog = [
  {
    id: '1',
    title: 'Tablas del Reggaetón - Tabla del 2',
    artist: 'NewCool Edu',
    album: 'Matemáticas Bailables',
    genre: 'reggaeton',
    duration: 180,
    url: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/music/tablas-2.mp3',
  },
  {
    id: '2',
    title: 'Elementos Trap - Hidrógeno',
    artist: 'Ciencia Cool',
    album: 'Tabla Periódica Vol. 1',
    genre: 'trap',
    duration: 210,
    url: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/music/hidrogeno.mp3',
  },
  {
    id: '3',
    title: 'Cumbia de los Continentes',
    artist: 'Geo Cool',
    album: 'Geografía Musical',
    genre: 'cumbia',
    duration: 195,
    url: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/music/continentes.mp3',
  },
  {
    id: '4',
    title: 'Rock de los Verbos',
    artist: 'Lengua Viva',
    album: 'Gramática Rock',
    genre: 'rock',
    duration: 240,
    url: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/music/verbos.mp3',
  },
  {
    id: '5',
    title: 'Pop Histórico - 1810',
    artist: 'Historia Pop',
    album: 'Fechas que Importan',
    genre: 'pop',
    duration: 200,
    url: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/music/1810.mp3',
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams.entries());

    const validation = validateBody(musicQuerySchema, params);
    if (!validation.success) {
      return error(validation.error);
    }

    const { genre, artist, limit, offset } = validation.data;

    let results = [...mockCatalog];

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
      genres: ['reggaeton', 'trap', 'cumbia', 'rock', 'pop'],
    }, { total, limit, offset });

  } catch (err) {
    console.error('Music error:', err);
    return serverError();
  }
}
