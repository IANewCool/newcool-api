import { success, serverError } from '@/lib/api-response';
import { getAllUserProgress, getCourse } from '@/lib/education';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'demo-user';

    const progress = getAllUserProgress(userId);

    // Enrich with course info
    const enriched = progress.map(p => {
      const course = getCourse(p.courseId);
      return {
        ...p,
        course: course ? {
          id: course.id,
          title: course.title,
          subject: course.subject,
          coverUrl: course.coverUrl,
        } : null,
      };
    });

    // Calculate stats
    const stats = {
      totalEnrolled: progress.length,
      inProgress: progress.filter(p => p.status === 'in_progress').length,
      completed: progress.filter(p => p.status === 'completed' || p.status === 'certified').length,
      certified: progress.filter(p => p.status === 'certified').length,
      totalLessonsCompleted: progress.reduce((sum, p) => sum + p.completedLessons.length, 0),
      averageProgress: progress.length > 0
        ? Math.round(progress.reduce((sum, p) => sum + p.progress, 0) / progress.length)
        : 0,
    };

    return success({
      userId,
      progress: enriched,
      stats,
    });

  } catch (err) {
    console.error('Progress error:', err);
    return serverError();
  }
}
