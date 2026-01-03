/**
 * NewCool Music Catalog
 * Educational music streaming service
 */

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  subject: string;
  grade: string;
  duration: number; // seconds
  url: string;
  coverUrl: string;
  lyrics?: string;
  plays: number;
  likes: number;
  createdAt: string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  genre: string;
  subject: string;
  coverUrl: string;
  tracks: string[]; // track IDs
  releaseDate: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  tracks: string[];
  isPublic: boolean;
  createdBy: string;
}

// Full music catalog (simulating 100+ tracks)
export const musicCatalog: Track[] = [
  // Matemáticas - Reggaetón
  { id: 't001', title: 'Tabla del 2', artist: 'NewCool Edu', album: 'Tablas del Reggaetón', genre: 'reggaeton', subject: 'math', grade: '1-3', duration: 180, url: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/music/tabla-2.mp3', coverUrl: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/covers/tablas-reggaeton.jpg', plays: 45230, likes: 3200, createdAt: '2025-06-01' },
  { id: 't002', title: 'Tabla del 3', artist: 'NewCool Edu', album: 'Tablas del Reggaetón', genre: 'reggaeton', subject: 'math', grade: '1-3', duration: 175, url: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/music/tabla-3.mp3', coverUrl: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/covers/tablas-reggaeton.jpg', plays: 38900, likes: 2800, createdAt: '2025-06-01' },
  { id: 't003', title: 'Tabla del 4', artist: 'NewCool Edu', album: 'Tablas del Reggaetón', genre: 'reggaeton', subject: 'math', grade: '1-3', duration: 185, url: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/music/tabla-4.mp3', coverUrl: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/covers/tablas-reggaeton.jpg', plays: 35600, likes: 2500, createdAt: '2025-06-01' },
  { id: 't004', title: 'Tabla del 5', artist: 'NewCool Edu', album: 'Tablas del Reggaetón', genre: 'reggaeton', subject: 'math', grade: '1-3', duration: 170, url: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/music/tabla-5.mp3', coverUrl: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/covers/tablas-reggaeton.jpg', plays: 42100, likes: 3100, createdAt: '2025-06-01' },
  { id: 't005', title: 'Tabla del 6', artist: 'NewCool Edu', album: 'Tablas del Reggaetón', genre: 'reggaeton', subject: 'math', grade: '1-3', duration: 178, url: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/music/tabla-6.mp3', coverUrl: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/covers/tablas-reggaeton.jpg', plays: 31200, likes: 2300, createdAt: '2025-06-01' },
  { id: 't006', title: 'Tabla del 7', artist: 'NewCool Edu', album: 'Tablas del Reggaetón', genre: 'reggaeton', subject: 'math', grade: '1-3', duration: 182, url: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/music/tabla-7.mp3', coverUrl: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/covers/tablas-reggaeton.jpg', plays: 28900, likes: 2100, createdAt: '2025-06-01' },
  { id: 't007', title: 'Tabla del 8', artist: 'NewCool Edu', album: 'Tablas del Reggaetón', genre: 'reggaeton', subject: 'math', grade: '1-3', duration: 176, url: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/music/tabla-8.mp3', coverUrl: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/covers/tablas-reggaeton.jpg', plays: 27500, likes: 2000, createdAt: '2025-06-01' },
  { id: 't008', title: 'Tabla del 9', artist: 'NewCool Edu', album: 'Tablas del Reggaetón', genre: 'reggaeton', subject: 'math', grade: '1-3', duration: 180, url: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/music/tabla-9.mp3', coverUrl: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/covers/tablas-reggaeton.jpg', plays: 25800, likes: 1900, createdAt: '2025-06-01' },
  { id: 't009', title: 'Tabla del 10', artist: 'NewCool Edu', album: 'Tablas del Reggaetón', genre: 'reggaeton', subject: 'math', grade: '1-3', duration: 168, url: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/music/tabla-10.mp3', coverUrl: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/covers/tablas-reggaeton.jpg', plays: 32400, likes: 2400, createdAt: '2025-06-01' },

  // Ciencias - Trap
  { id: 't010', title: 'Hidrógeno', artist: 'Ciencia Cool', album: 'Elementos Trap', genre: 'trap', subject: 'chemistry', grade: '7-9', duration: 210, url: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/music/hidrogeno.mp3', coverUrl: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/covers/elementos-trap.jpg', plays: 18900, likes: 1500, createdAt: '2025-07-15' },
  { id: 't011', title: 'Oxígeno', artist: 'Ciencia Cool', album: 'Elementos Trap', genre: 'trap', subject: 'chemistry', grade: '7-9', duration: 205, url: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/music/oxigeno.mp3', coverUrl: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/covers/elementos-trap.jpg', plays: 17200, likes: 1400, createdAt: '2025-07-15' },
  { id: 't012', title: 'Carbono', artist: 'Ciencia Cool', album: 'Elementos Trap', genre: 'trap', subject: 'chemistry', grade: '7-9', duration: 198, url: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/music/carbono.mp3', coverUrl: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/covers/elementos-trap.jpg', plays: 15800, likes: 1300, createdAt: '2025-07-15' },
  { id: 't013', title: 'Nitrógeno', artist: 'Ciencia Cool', album: 'Elementos Trap', genre: 'trap', subject: 'chemistry', grade: '7-9', duration: 215, url: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/music/nitrogeno.mp3', coverUrl: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/covers/elementos-trap.jpg', plays: 14500, likes: 1200, createdAt: '2025-07-15' },

  // Geografía - Cumbia
  { id: 't014', title: 'Los Continentes', artist: 'Geo Cool', album: 'Geografía Musical', genre: 'cumbia', subject: 'geography', grade: '4-6', duration: 195, url: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/music/continentes.mp3', coverUrl: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/covers/geografia-musical.jpg', plays: 22100, likes: 1800, createdAt: '2025-08-01' },
  { id: 't015', title: 'Los Océanos', artist: 'Geo Cool', album: 'Geografía Musical', genre: 'cumbia', subject: 'geography', grade: '4-6', duration: 188, url: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/music/oceanos.mp3', coverUrl: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/covers/geografia-musical.jpg', plays: 19800, likes: 1600, createdAt: '2025-08-01' },
  { id: 't016', title: 'Capitales del Mundo', artist: 'Geo Cool', album: 'Geografía Musical', genre: 'cumbia', subject: 'geography', grade: '4-6', duration: 202, url: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/music/capitales.mp3', coverUrl: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/covers/geografia-musical.jpg', plays: 21300, likes: 1750, createdAt: '2025-08-01' },

  // Español - Rock
  { id: 't017', title: 'Los Verbos', artist: 'Lengua Viva', album: 'Gramática Rock', genre: 'rock', subject: 'spanish', grade: '4-6', duration: 240, url: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/music/verbos.mp3', coverUrl: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/covers/gramatica-rock.jpg', plays: 16500, likes: 1350, createdAt: '2025-09-01' },
  { id: 't018', title: 'Los Sustantivos', artist: 'Lengua Viva', album: 'Gramática Rock', genre: 'rock', subject: 'spanish', grade: '4-6', duration: 235, url: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/music/sustantivos.mp3', coverUrl: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/covers/gramatica-rock.jpg', plays: 15200, likes: 1250, createdAt: '2025-09-01' },
  { id: 't019', title: 'Los Adjetivos', artist: 'Lengua Viva', album: 'Gramática Rock', genre: 'rock', subject: 'spanish', grade: '4-6', duration: 228, url: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/music/adjetivos.mp3', coverUrl: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/covers/gramatica-rock.jpg', plays: 14100, likes: 1150, createdAt: '2025-09-01' },

  // Historia - Pop
  { id: 't020', title: '1810 - Independencia', artist: 'Historia Pop', album: 'Fechas que Importan', genre: 'pop', subject: 'history', grade: '7-9', duration: 200, url: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/music/1810.mp3', coverUrl: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/covers/fechas-importan.jpg', plays: 28700, likes: 2200, createdAt: '2025-09-18' },
  { id: 't021', title: '1879 - Guerra del Pacífico', artist: 'Historia Pop', album: 'Fechas que Importan', genre: 'pop', subject: 'history', grade: '7-9', duration: 195, url: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/music/1879.mp3', coverUrl: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/covers/fechas-importan.jpg', plays: 24500, likes: 1900, createdAt: '2025-09-18' },
  { id: 't022', title: '1973 - Golpe de Estado', artist: 'Historia Pop', album: 'Fechas que Importan', genre: 'pop', subject: 'history', grade: '10-12', duration: 220, url: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/music/1973.mp3', coverUrl: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/covers/fechas-importan.jpg', plays: 31200, likes: 2500, createdAt: '2025-09-18' },

  // Inglés - Pop
  { id: 't023', title: 'Colors Song', artist: 'English Cool', album: 'Learn English', genre: 'pop', subject: 'english', grade: '1-3', duration: 165, url: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/music/colors.mp3', coverUrl: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/covers/learn-english.jpg', plays: 35600, likes: 2800, createdAt: '2025-10-01' },
  { id: 't024', title: 'Numbers 1-20', artist: 'English Cool', album: 'Learn English', genre: 'pop', subject: 'english', grade: '1-3', duration: 170, url: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/music/numbers.mp3', coverUrl: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/covers/learn-english.jpg', plays: 38200, likes: 3000, createdAt: '2025-10-01' },
  { id: 't025', title: 'Days of the Week', artist: 'English Cool', album: 'Learn English', genre: 'pop', subject: 'english', grade: '1-3', duration: 158, url: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/music/days.mp3', coverUrl: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/covers/learn-english.jpg', plays: 33400, likes: 2650, createdAt: '2025-10-01' },
];

// Albums
export const albums: Album[] = [
  { id: 'a001', title: 'Tablas del Reggaetón', artist: 'NewCool Edu', genre: 'reggaeton', subject: 'math', coverUrl: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/covers/tablas-reggaeton.jpg', tracks: ['t001', 't002', 't003', 't004', 't005', 't006', 't007', 't008', 't009'], releaseDate: '2025-06-01' },
  { id: 'a002', title: 'Elementos Trap', artist: 'Ciencia Cool', genre: 'trap', subject: 'chemistry', coverUrl: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/covers/elementos-trap.jpg', tracks: ['t010', 't011', 't012', 't013'], releaseDate: '2025-07-15' },
  { id: 'a003', title: 'Geografía Musical', artist: 'Geo Cool', genre: 'cumbia', subject: 'geography', coverUrl: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/covers/geografia-musical.jpg', tracks: ['t014', 't015', 't016'], releaseDate: '2025-08-01' },
  { id: 'a004', title: 'Gramática Rock', artist: 'Lengua Viva', genre: 'rock', subject: 'spanish', coverUrl: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/covers/gramatica-rock.jpg', tracks: ['t017', 't018', 't019'], releaseDate: '2025-09-01' },
  { id: 'a005', title: 'Fechas que Importan', artist: 'Historia Pop', genre: 'pop', subject: 'history', coverUrl: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/covers/fechas-importan.jpg', tracks: ['t020', 't021', 't022'], releaseDate: '2025-09-18' },
  { id: 'a006', title: 'Learn English', artist: 'English Cool', genre: 'pop', subject: 'english', coverUrl: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/covers/learn-english.jpg', tracks: ['t023', 't024', 't025'], releaseDate: '2025-10-01' },
];

// Curated playlists
export const playlists: Playlist[] = [
  { id: 'p001', name: 'Top Educativo', description: 'Las canciones más escuchadas', coverUrl: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/playlists/top-educativo.jpg', tracks: ['t001', 't024', 't020', 't014', 't010'], isPublic: true, createdBy: 'system' },
  { id: 'p002', name: 'Matemáticas Divertidas', description: 'Aprende matemáticas bailando', coverUrl: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/playlists/math-fun.jpg', tracks: ['t001', 't002', 't003', 't004', 't005', 't006', 't007', 't008', 't009'], isPublic: true, createdBy: 'system' },
  { id: 'p003', name: 'Ciencias para Todos', description: 'Descubre la ciencia con música', coverUrl: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/playlists/science.jpg', tracks: ['t010', 't011', 't012', 't013'], isPublic: true, createdBy: 'system' },
  { id: 'p004', name: 'English Time', description: 'Learn English with songs', coverUrl: 'https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/playlists/english.jpg', tracks: ['t023', 't024', 't025'], isPublic: true, createdBy: 'system' },
];

// Helper functions
export function getTrack(id: string): Track | undefined {
  return musicCatalog.find(t => t.id === id);
}

export function getAlbum(id: string): Album | undefined {
  return albums.find(a => a.id === id);
}

export function getPlaylist(id: string): Playlist | undefined {
  return playlists.find(p => p.id === id);
}

export function getAlbumTracks(albumId: string): Track[] {
  const album = getAlbum(albumId);
  if (!album) return [];
  return album.tracks.map(id => getTrack(id)).filter((t): t is Track => t !== undefined);
}

export function getPlaylistTracks(playlistId: string): Track[] {
  const playlist = getPlaylist(playlistId);
  if (!playlist) return [];
  return playlist.tracks.map(id => getTrack(id)).filter((t): t is Track => t !== undefined);
}

export function searchMusic(query: string, filters?: { genre?: string; subject?: string; grade?: string }): Track[] {
  const q = query.toLowerCase();
  return musicCatalog.filter(track => {
    const matchesQuery = track.title.toLowerCase().includes(q) ||
                        track.artist.toLowerCase().includes(q) ||
                        track.album.toLowerCase().includes(q);
    const matchesGenre = !filters?.genre || track.genre === filters.genre;
    const matchesSubject = !filters?.subject || track.subject === filters.subject;
    const matchesGrade = !filters?.grade || track.grade === filters.grade;
    return matchesQuery && matchesGenre && matchesSubject && matchesGrade;
  });
}

export function getStats() {
  return {
    totalTracks: musicCatalog.length,
    totalAlbums: albums.length,
    totalPlaylists: playlists.length,
    totalPlays: musicCatalog.reduce((sum, t) => sum + t.plays, 0),
    totalLikes: musicCatalog.reduce((sum, t) => sum + t.likes, 0),
    genres: [...new Set(musicCatalog.map(t => t.genre))],
    subjects: [...new Set(musicCatalog.map(t => t.subject))],
  };
}

// Mutation functions (in production these would hit the database)
export function incrementPlays(id: string): Track | undefined {
  const track = musicCatalog.find(t => t.id === id);
  if (track) {
    track.plays += 1;
  }
  return track;
}

export function incrementLikes(id: string): Track | undefined {
  const track = musicCatalog.find(t => t.id === id);
  if (track) {
    track.likes += 1;
  }
  return track;
}

// Aliases for route compatibility
export const tracks = musicCatalog;
export const genres = ['reggaeton', 'trap', 'cumbia', 'rock', 'pop'] as const;
