import { success, serverError } from '@/lib/api-response';
import { quizzes } from '@/lib/education';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');

    let results = [...quizzes];

    if (courseId) {
      results = results.filter(q => q.courseId === courseId);
    }

    return success({
      quizzes: results.map(q => ({
        id: q.id,
        courseId: q.courseId,
        lessonId: q.lessonId,
        title: q.title,
        description: q.description,
        questionCount: q.questions.length,
        passingScore: q.passingScore,
        timeLimit: q.timeLimit,
        attempts: q.attempts,
      })),
    }, { total: results.length });

  } catch (err) {
    console.error('Quizzes error:', err);
    return serverError();
  }
}
