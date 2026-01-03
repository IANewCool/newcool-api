import { success, notFound, error, serverError } from '@/lib/api-response';
import { getCourse, enrollUser, getUserProgress } from '@/lib/education';

interface Params {
  params: Promise<{ id: string }>;
}

export async function POST(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { userId = 'demo-user' } = body;

    const course = getCourse(id);
    if (!course) {
      return notFound('Curso no encontrado');
    }

    // Check if already enrolled
    const existing = getUserProgress(userId, id);
    if (existing) {
      return success({
        message: 'Ya estás inscrito en este curso',
        progress: existing,
        course: { id: course.id, title: course.title },
      });
    }

    // Check if paid course (in production, verify payment)
    if (!course.isFree) {
      // For demo, allow enrollment
      // In production: verify payment before enrolling
    }

    const progress = enrollUser(userId, id);

    return success({
      message: 'Inscripción exitosa',
      progress,
      course: {
        id: course.id,
        title: course.title,
        modules: course.modules,
        lessons: course.lessons,
      },
    });

  } catch (err) {
    console.error('Enroll error:', err);
    return serverError();
  }
}

export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'demo-user';

    const progress = getUserProgress(userId, id);
    if (!progress) {
      return success({ enrolled: false });
    }

    const course = getCourse(id);

    return success({
      enrolled: true,
      progress,
      course: course ? { id: course.id, title: course.title } : null,
    });

  } catch (err) {
    console.error('Check enrollment error:', err);
    return serverError();
  }
}
