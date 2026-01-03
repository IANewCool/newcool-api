import { searchQuerySchema, validateBody } from '@/lib/validations';
import { success, error, serverError } from '@/lib/api-response';

// Mock search results - will connect to Search V3 later
const mockResults = {
  music: [
    { id: '1', title: 'Tablas del Reggaetón', artist: 'NewCool Edu', type: 'music' },
    { id: '2', title: 'Elementos Trap', artist: 'Ciencia Cool', type: 'music' },
  ],
  courses: [
    { id: '1', title: 'Matemáticas Básicas', modules: 12, type: 'course' },
    { id: '2', title: 'Inglés para Principiantes', modules: 20, type: 'course' },
  ],
  modules: [
    { id: 'math', name: 'newcool-math', category: 'education', type: 'module' },
    { id: 'music', name: 'newcool-music', category: 'streaming', type: 'module' },
  ],
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams.entries());

    const validation = validateBody(searchQuerySchema, params);
    if (!validation.success) {
      return error(validation.error);
    }

    const { q, type, limit, offset } = validation.data;
    const query = q.toLowerCase();

    let results: Array<{ id: string; title?: string; name?: string; type: string }> = [];

    // Filter by type
    if (type === 'all' || type === 'music') {
      results = results.concat(
        mockResults.music.filter(r => r.title.toLowerCase().includes(query))
      );
    }
    if (type === 'all' || type === 'courses') {
      results = results.concat(
        mockResults.courses.filter(r => r.title.toLowerCase().includes(query))
      );
    }
    if (type === 'all' || type === 'modules') {
      results = results.concat(
        mockResults.modules.filter(r => r.name.toLowerCase().includes(query))
      );
    }

    // Paginate
    const total = results.length;
    results = results.slice(offset, offset + limit);

    return success({
      query: q,
      results,
    }, { total, limit, offset });

  } catch (err) {
    console.error('Search error:', err);
    return serverError();
  }
}
