import { search, getStats, SearchOptions } from '@/lib/search-engine';
import { success, error, serverError } from '@/lib/api-response';
import { z } from 'zod';

const searchSchema = z.object({
  q: z.string().min(1).max(200),
  type: z.enum(['all', 'music', 'courses', 'modules']).default('all'),
  subject: z.string().optional(),
  grade: z.string().optional(),
  genre: z.string().optional(),
  limit: z.coerce.number().min(1).max(100).default(20),
  offset: z.coerce.number().min(0).default(0),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams.entries());

    // Special case: stats endpoint
    if (params.stats === 'true') {
      return success(getStats());
    }

    const validation = searchSchema.safeParse(params);
    if (!validation.success) {
      return error(validation.error.issues[0]?.message || 'Invalid query');
    }

    const { q, type, subject, grade, genre, limit, offset } = validation.data;

    const options: SearchOptions = { type, subject, grade, genre, limit, offset };
    const { results, total } = search(q, options);

    return success({
      query: q,
      filters: { type, subject, grade, genre },
      results,
    }, { total, limit, offset });

  } catch (err) {
    console.error('Search error:', err);
    return serverError();
  }
}
