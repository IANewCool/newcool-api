import { success, notFound, serverError } from '@/lib/api-response';
import { getCourse, getCourseLessons, getCourseQuizzes } from '@/lib/education';

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = await params;

    const course = getCourse(id);
    if (!course) {
      return notFound('Curso no encontrado');
    }

    const lessons = getCourseLessons(id);
    const quizzes = getCourseQuizzes(id);

    // Group lessons by module
    const modules: { moduleIndex: number; lessons: typeof lessons }[] = [];
    lessons.forEach(lesson => {
      const existing = modules.find(m => m.moduleIndex === lesson.moduleIndex);
      if (existing) {
        existing.lessons.push(lesson);
      } else {
        modules.push({ moduleIndex: lesson.moduleIndex, lessons: [lesson] });
      }
    });

    return success({
      ...course,
      modules: modules.sort((a, b) => a.moduleIndex - b.moduleIndex),
      quizzes: quizzes.map(q => ({
        id: q.id,
        title: q.title,
        lessonId: q.lessonId,
        questionCount: q.questions.length,
        passingScore: q.passingScore,
        timeLimit: q.timeLimit,
      })),
      totalDuration: lessons.reduce((sum, l) => sum + l.duration, 0),
    });

  } catch (err) {
    console.error('Get course error:', err);
    return serverError();
  }
}
