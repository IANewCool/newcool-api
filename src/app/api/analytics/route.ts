import { success, error, serverError } from '@/lib/api-response';
import {
  getPlatformStats,
  getUserAnalytics,
  getDashboardData,
  getMetrics,
  trackEvent,
  getFunnelData,
} from '@/lib/analytics';
import { z } from 'zod';

const trackEventSchema = z.object({
  userId: z.string().optional(),
  event: z.string().min(1).max(100),
  properties: z.record(z.string(), z.unknown()).optional(),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const view = searchParams.get('view');

    // Platform stats
    if (view === 'platform' || !view) {
      const stats = getPlatformStats();
      return success({
        type: 'platform',
        stats,
        generatedAt: new Date().toISOString(),
      });
    }

    // Dashboard data
    if (view === 'dashboard') {
      const dashboard = getDashboardData();
      return success({
        type: 'dashboard',
        ...dashboard,
        generatedAt: new Date().toISOString(),
      });
    }

    // User analytics
    if (view === 'user') {
      const userId = searchParams.get('userId') || 'demo-user';
      const analytics = getUserAnalytics(userId);
      return success({
        type: 'user',
        ...analytics,
        generatedAt: new Date().toISOString(),
      });
    }

    // Specific metrics
    if (view === 'metrics') {
      const metric = searchParams.get('metric') as 'users' | 'enrollments' | 'plays' | 'sessions' | 'citas';
      const period = (searchParams.get('period') || 'week') as 'day' | 'week' | 'month' | 'year';

      if (!metric || !['users', 'enrollments', 'plays', 'sessions', 'citas'].includes(metric)) {
        return error('Métrica inválida. Usa: users, enrollments, plays, sessions, citas');
      }

      const metrics = getMetrics(metric, period);
      return success({
        type: 'metrics',
        metric,
        period,
        ...metrics,
        generatedAt: new Date().toISOString(),
      });
    }

    // Funnel data
    if (view === 'funnel') {
      const funnel = (searchParams.get('funnel') || 'onboarding') as 'onboarding' | 'course' | 'purchase';

      if (!['onboarding', 'course', 'purchase'].includes(funnel)) {
        return error('Funnel inválido. Usa: onboarding, course, purchase');
      }

      const funnelData = getFunnelData(funnel);
      return success({
        type: 'funnel',
        funnel,
        ...funnelData,
        generatedAt: new Date().toISOString(),
      });
    }

    return error('Vista inválida. Usa: platform, dashboard, user, metrics, funnel');

  } catch (err) {
    console.error('Analytics error:', err);
    return serverError();
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Track event
    const validation = trackEventSchema.safeParse(body);
    if (!validation.success) {
      return error(validation.error.issues[0]?.message || 'Datos inválidos');
    }

    const { userId = 'anonymous', event, properties } = validation.data;
    const result = trackEvent(userId, event, properties);

    return success({
      message: 'Evento registrado',
      ...result,
      event,
      userId,
    });

  } catch (err) {
    console.error('Track event error:', err);
    return serverError();
  }
}
