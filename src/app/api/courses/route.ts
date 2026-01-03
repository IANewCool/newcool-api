import { success, error, serverError } from '@/lib/api-response';
import { courses, getEducationStats } from '@/lib/education';
import { z } from 'zod';

const querySchema = z.object({
  subject: z.string().optional(),
  grade: z.string().optional(),
  level: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  free: z.enum(['true', 'false']).optional(),
  limit: z.coerce.number().min(1).max(100).default(20),
  offset: z.coerce.number().min(0).default(0),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams.entries());

    // Stats endpoint
    if (params.stats === 'true') {
      return success(getEducationStats());
    }

    const validation = querySchema.safeParse(params);
    if (!validation.success) {
      return error(validation.error.issues[0]?.message || 'Invalid query');
    }

    const { subject, grade, level, free, limit, offset } = validation.data;

    let results = [...courses];

    // Filters
    if (subject) results = results.filter(c => c.subject === subject);
    if (grade) results = results.filter(c => c.grade === grade);
    if (level) results = results.filter(c => c.level === level);
    if (free === 'true') results = results.filter(c => c.isFree);
    if (free === 'false') results = results.filter(c => !c.isFree);

    // Sort by enrollments (popularity)
    results.sort((a, b) => b.enrollments - a.enrollments);

    const total = results.length;
    results = results.slice(offset, offset + limit);

    return success({
      courses: results,
      subjects: [...new Set(courses.map(c => c.subject))],
      levels: ['beginner', 'intermediate', 'advanced'],
    }, { total, limit, offset });

  } catch (err) {
    console.error('Courses error:', err);
    return serverError();
  }
}
