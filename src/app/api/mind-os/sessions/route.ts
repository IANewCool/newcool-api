import { success, error, notFound, serverError } from '@/lib/api-response';
import { startSession, endSession, getUserSessions, getMode } from '@/lib/mind-os';
import { z } from 'zod';

const startSessionSchema = z.object({
  modeId: z.string().min(1),
  userId: z.string().optional(),
});

const endSessionSchema = z.object({
  sessionId: z.string().min(1),
  rating: z.number().min(1).max(5).optional(),
  notes: z.string().max(500).optional(),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'demo-user';
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');

    const sessions = getUserSessions(userId);

    // Sort by most recent
    sessions.sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());

    // Paginate
    const total = sessions.length;
    const paginated = sessions.slice(offset, offset + limit);

    // Enrich with mode info
    const enriched = paginated.map(session => ({
      ...session,
      mode: getMode(session.modeId),
    }));

    return success({ sessions: enriched }, { total, limit, offset });

  } catch (err) {
    console.error('Sessions error:', err);
    return serverError();
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Check if ending a session
    if (body.action === 'end') {
      const validation = endSessionSchema.safeParse(body);
      if (!validation.success) {
        return error(validation.error.issues[0]?.message || 'Invalid session data');
      }

      const { sessionId, rating, notes } = validation.data;
      const session = endSession(sessionId, rating, notes);

      if (!session) {
        return notFound('Session not found');
      }

      return success({
        message: 'Session completed',
        session,
        mode: getMode(session.modeId),
      });
    }

    // Starting a new session
    const validation = startSessionSchema.safeParse(body);
    if (!validation.success) {
      return error(validation.error.issues[0]?.message || 'Invalid session data');
    }

    const { modeId, userId = 'demo-user' } = validation.data;

    // Validate mode exists
    const mode = getMode(modeId);
    if (!mode) {
      return error('Invalid cognitive mode');
    }

    const session = startSession(userId, modeId);

    return success({
      message: 'Session started',
      session,
      mode,
      guide: {
        recommendedDuration: mode.duration,
        techniques: mode.techniques,
        tips: [
          'Start with a clear intention',
          `This session works best for ${mode.duration} minutes`,
          'Take breaks if needed',
        ],
      },
    });

  } catch (err) {
    console.error('Session action error:', err);
    return serverError();
  }
}
