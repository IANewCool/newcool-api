import { success, notFound, serverError } from '@/lib/api-response';
import { getCourse, getCourseLessons, getLesson, completeLesson, getUserProgress } from '@/lib/education';

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const lessonId = searchParams.get('lessonId');
    const userId = searchParams.get('userId') || 'demo-user';

    const course = getCourse(id);
    if (!course) {
      return notFound('Curso no encontrado');
    }

    // Get specific lesson
    if (lessonId) {
      const lesson = getLesson(lessonId);
      if (!lesson || lesson.courseId !== id) {
        return notFound('Lección no encontrada');
      }

      const progress = getUserProgress(userId, id);
      const isCompleted = progress?.completedLessons.includes(lessonId) || false;

      return success({
        ...lesson,
        isCompleted,
        course: { id: course.id, title: course.title },
      });
    }

    // Get all lessons
    const lessons = getCourseLessons(id);
    const progress = getUserProgress(userId, id);

    return success({
      lessons: lessons.map(l => ({
        ...l,
        isCompleted: progress?.completedLessons.includes(l.id) || false,
      })),
      totalLessons: lessons.length,
      completedLessons: progress?.completedLessons.length || 0,
    });

  } catch (err) {
    console.error('Lessons error:', err);
    return serverError();
  }
}

export async function POST(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { lessonId, userId = 'demo-user' } = body;

    if (!lessonId) {
      return notFound('lessonId requerido');
    }

    const lesson = getLesson(lessonId);
    if (!lesson || lesson.courseId !== id) {
      return notFound('Lección no encontrada');
    }

    const progress = completeLesson(userId, id, lessonId);
    if (!progress) {
      return notFound('Debes estar inscrito en el curso primero');
    }

    return success({
      message: 'Lección completada',
      lessonId,
      progress: progress.progress,
      completedLessons: progress.completedLessons.length,
      status: progress.status,
    });

  } catch (err) {
    console.error('Complete lesson error:', err);
    return serverError();
  }
}
