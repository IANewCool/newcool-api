import { success, serverError } from '@/lib/api-response';
import { cognitiveModes, getStats } from '@/lib/mind-os';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Stats endpoint
    if (searchParams.get('stats') === 'true') {
      return success(getStats());
    }

    // Return overview
    return success({
      name: 'Mind OS',
      version: '1.0.0-beta',
      description: 'Cognitive Enhancement System for personalized learning and productivity',
      features: [
        'Cognitive Modes - Optimize your mental state for any task',
        'Personalization - Adapt to your learning style and preferences',
        'Progress Tracking - Monitor your growth and achievements',
        'Session Management - Guided sessions with techniques',
      ],
      totalModes: cognitiveModes.length,
      categories: ['focus', 'creative', 'learning', 'wellness', 'productivity'],
      endpoints: {
        modes: '/api/mind-os/modes',
        profile: '/api/mind-os/profile',
        sessions: '/api/mind-os/sessions',
      },
    });

  } catch (err) {
    console.error('Mind OS error:', err);
    return serverError();
  }
}
