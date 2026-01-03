import { success, error, serverError } from '@/lib/api-response';
import {
  getNotifications,
  createNotification,
  markAllAsRead,
  getPreferences,
  updatePreferences,
  NotificationType,
} from '@/lib/notifications';
import { z } from 'zod';

const createNotificationSchema = z.object({
  userId: z.string().optional(),
  type: z.enum(['course', 'cita', 'achievement', 'quiz', 'system', 'reminder']),
  title: z.string().min(1).max(100),
  message: z.string().min(1).max(500),
  link: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

const updatePreferencesSchema = z.object({
  email: z.boolean().optional(),
  push: z.boolean().optional(),
  sms: z.boolean().optional(),
  types: z.object({
    course: z.boolean().optional(),
    cita: z.boolean().optional(),
    achievement: z.boolean().optional(),
    quiz: z.boolean().optional(),
    system: z.boolean().optional(),
    reminder: z.boolean().optional(),
  }).optional(),
  quietHours: z.object({
    enabled: z.boolean(),
    start: z.string().regex(/^\d{2}:\d{2}$/),
    end: z.string().regex(/^\d{2}:\d{2}$/),
  }).optional(),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'demo-user';
    const unreadOnly = searchParams.get('unread') === 'true';
    const type = searchParams.get('type') as NotificationType | null;
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Get preferences
    if (searchParams.get('preferences') === 'true') {
      const preferences = getPreferences(userId);
      return success({ preferences });
    }

    // Get notifications
    const result = getNotifications(userId, {
      unreadOnly,
      type: type || undefined,
      limit: Math.min(limit, 100),
      offset,
    });

    return success({
      userId,
      notifications: result.notifications,
      unreadCount: result.unreadCount,
    }, { total: result.total, limit, offset });

  } catch (err) {
    console.error('Notifications error:', err);
    return serverError();
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Handle mark all as read
    if (body.action === 'markAllRead') {
      const userId = body.userId || 'demo-user';
      const count = markAllAsRead(userId);
      return success({
        message: `${count} notificaciones marcadas como leídas`,
        markedCount: count,
      });
    }

    // Handle preferences update
    if (body.action === 'updatePreferences') {
      const validation = updatePreferencesSchema.safeParse(body.preferences);
      if (!validation.success) {
        return error(validation.error.issues[0]?.message || 'Preferencias inválidas');
      }
      const userId = body.userId || 'demo-user';
      const preferences = updatePreferences(userId, validation.data);
      return success({
        message: 'Preferencias actualizadas',
        preferences,
      });
    }

    // Create notification
    const validation = createNotificationSchema.safeParse(body);
    if (!validation.success) {
      return error(validation.error.issues[0]?.message || 'Datos inválidos');
    }

    const { userId = 'demo-user', type, title, message, link, metadata } = validation.data;

    const notification = createNotification(userId, type, title, message, {
      link,
      metadata,
    });

    return success({
      message: 'Notificación creada',
      notification,
    });

  } catch (err) {
    console.error('Create notification error:', err);
    return serverError();
  }
}
