/**
 * Search V3 Engine
 * Hybrid search with BM25 + semantic matching
 * Integrated with Music Catalog
 */

import { musicCatalog } from './music-catalog';

// Generate music index from catalog with enhanced keywords
export const musicIndex = musicCatalog.map(track => ({
  id: track.id,
  title: track.title,
  artist: track.artist,
  album: track.album,
  genre: track.genre,
  subject: track.subject,
  grade: track.grade,
  keywords: generateKeywords(track),
  plays: track.plays,
  likes: track.likes,
}));

// Generate keywords based on track metadata
function generateKeywords(track: typeof musicCatalog[0]): string[] {
  const keywords: string[] = [];

  // Subject-based keywords
  const subjectKeywords: Record<string, string[]> = {
    math: ['multiplicación', 'tablas', 'matemáticas', 'números'],
    chemistry: ['elementos', 'tabla periódica', 'química', 'ciencia'],
    geography: ['continentes', 'océanos', 'geografía', 'mundo', 'capitales'],
    spanish: ['gramática', 'lenguaje', 'español', 'verbos', 'sustantivos'],
    history: ['historia', 'chile', 'fechas', 'independencia'],
    english: ['inglés', 'english', 'colores', 'números'],
  };

  if (track.subject in subjectKeywords) {
    keywords.push(...subjectKeywords[track.subject]);
  }

  // Add title words
  keywords.push(...track.title.toLowerCase().split(/\s+/));

  return [...new Set(keywords)];
}

// Courses Index
export const coursesIndex = [
  { id: 'math-101', title: 'Matemáticas Básicas', subject: 'math', grade: '1-3', modules: 12, duration: '4 semanas', level: 'beginner' },
  { id: 'math-201', title: 'Álgebra Introductoria', subject: 'math', grade: '7-9', modules: 15, duration: '6 semanas', level: 'intermediate' },
  { id: 'math-301', title: 'Cálculo Diferencial', subject: 'math', grade: '10-12', modules: 20, duration: '8 semanas', level: 'advanced' },
  { id: 'sci-101', title: 'Ciencias Naturales', subject: 'science', grade: '4-6', modules: 10, duration: '4 semanas', level: 'beginner' },
  { id: 'sci-201', title: 'Química General', subject: 'chemistry', grade: '7-9', modules: 14, duration: '5 semanas', level: 'intermediate' },
  { id: 'sci-301', title: 'Física Mecánica', subject: 'physics', grade: '10-12', modules: 18, duration: '7 semanas', level: 'advanced' },
  { id: 'eng-101', title: 'Inglés para Principiantes', subject: 'english', grade: '1-3', modules: 20, duration: '8 semanas', level: 'beginner' },
  { id: 'eng-201', title: 'Inglés Intermedio', subject: 'english', grade: '4-6', modules: 25, duration: '10 semanas', level: 'intermediate' },
  { id: 'his-101', title: 'Historia de Chile', subject: 'history', grade: '7-9', modules: 12, duration: '5 semanas', level: 'intermediate' },
  { id: 'geo-101', title: 'Geografía Mundial', subject: 'geography', grade: '4-6', modules: 10, duration: '4 semanas', level: 'beginner' },
  { id: 'spa-101', title: 'Gramática Española', subject: 'spanish', grade: '4-6', modules: 15, duration: '6 semanas', level: 'intermediate' },
  { id: 'code-101', title: 'Programación para Niños', subject: 'coding', grade: '4-6', modules: 12, duration: '6 semanas', level: 'beginner' },
];

// Modules Index
export const modulesIndex = [
  { id: 'math', name: 'NewCool Math', department: 'T03', category: 'education', status: 'active', users: 15420 },
  { id: 'english', name: 'NewCool English', department: 'T03', category: 'education', status: 'active', users: 12350 },
  { id: 'science', name: 'NewCool Science', department: 'T03', category: 'education', status: 'active', users: 8900 },
  { id: 'history', name: 'NewCool History', department: 'T03', category: 'education', status: 'active', users: 6780 },
  { id: 'geography', name: 'NewCool Geography', department: 'T03', category: 'education', status: 'active', users: 5430 },
  { id: 'streaming', name: 'NewCool Music', department: 'T04', category: 'streaming', status: 'active', users: 25600 },
  { id: 'mind-os', name: 'Mind OS', department: 'T11', category: 'premium', status: 'active', users: 3200 },
  { id: 'fixmatch', name: 'FixMatch', department: 'T06', category: 'marketplace', status: 'active', users: 8900 },
  { id: 'search-v3', name: 'Search V3', department: 'T02', category: 'infrastructure', status: 'active', users: 45000 },
  { id: 'atlas-v4', name: 'Atlas Browser', department: 'T02', category: 'browser', status: 'beta', users: 1200 },
];

// BM25-like scoring
function calculateScore(query: string, text: string, keywords: string[] = []): number {
  const queryTerms = query.toLowerCase().split(/\s+/);
  const textLower = text.toLowerCase();
  let score = 0;

  for (const term of queryTerms) {
    // Exact match in title/text
    if (textLower.includes(term)) {
      score += 10;
    }
    // Match in keywords
    if (keywords.some(k => k.toLowerCase().includes(term))) {
      score += 5;
    }
    // Partial match
    if (textLower.split(/\s+/).some(word => word.startsWith(term))) {
      score += 3;
    }
  }

  return score;
}

export interface SearchOptions {
  type?: 'all' | 'music' | 'courses' | 'modules';
  subject?: string;
  grade?: string;
  genre?: string;
  limit?: number;
  offset?: number;
}

export interface SearchResult {
  id: string;
  type: 'music' | 'course' | 'module';
  title: string;
  score: number;
  [key: string]: unknown;
}

export function search(query: string, options: SearchOptions = {}): { results: SearchResult[]; total: number } {
  const { type = 'all', subject, grade, genre, limit = 20, offset = 0 } = options;
  let results: SearchResult[] = [];

  // Search music
  if (type === 'all' || type === 'music') {
    let musicResults = musicIndex
      .map(item => ({
        ...item,
        type: 'music' as const,
        score: calculateScore(query, `${item.title} ${item.artist}`, item.keywords),
      }))
      .filter(item => item.score > 0);

    if (subject) musicResults = musicResults.filter(r => r.subject === subject);
    if (grade) musicResults = musicResults.filter(r => r.grade === grade);
    if (genre) musicResults = musicResults.filter(r => r.genre === genre);

    results = results.concat(musicResults);
  }

  // Search courses
  if (type === 'all' || type === 'courses') {
    let courseResults = coursesIndex
      .map(item => ({
        ...item,
        type: 'course' as const,
        score: calculateScore(query, item.title),
      }))
      .filter(item => item.score > 0);

    if (subject) courseResults = courseResults.filter(r => r.subject === subject);
    if (grade) courseResults = courseResults.filter(r => r.grade === grade);

    results = results.concat(courseResults);
  }

  // Search modules
  if (type === 'all' || type === 'modules') {
    const moduleResults = modulesIndex
      .map(item => ({
        ...item,
        type: 'module' as const,
        title: item.name,
        score: calculateScore(query, item.name),
      }))
      .filter(item => item.score > 0);

    results = results.concat(moduleResults);
  }

  // Sort by score
  results.sort((a, b) => b.score - a.score);

  const total = results.length;
  results = results.slice(offset, offset + limit);

  return { results, total };
}

export function getStats() {
  return {
    music: { total: musicIndex.length, indexed: musicIndex.length },
    courses: { total: coursesIndex.length, indexed: coursesIndex.length },
    modules: { total: modulesIndex.length, indexed: modulesIndex.length },
    lastUpdated: new Date().toISOString(),
  };
}
