import { success, error, serverError } from '@/lib/api-response';
import {
  createWebhook,
  getWebhooks,
  listEvents,
  triggerEvent,
  WebhookEvent,
} from '@/lib/webhooks';
import { z } from 'zod';

const webhookEvents = [
  'user.created', 'user.updated',
  'course.enrolled', 'course.completed', 'lesson.completed', 'quiz.submitted',
  'cita.scheduled', 'cita.confirmed', 'cita.cancelled',
  'consulta.created', 'consulta.completed',
  'achievement.unlocked', 'session.started', 'session.ended',
] as const;

const createWebhookSchema = z.object({
  userId: z.string().optional(),
  url: z.string().url(),
  events: z.array(z.enum(webhookEvents)).min(1),
});

const triggerEventSchema = z.object({
  event: z.enum(webhookEvents),
  payload: z.record(z.string(), z.unknown()),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'demo-user';

    // List available events
    if (searchParams.get('events') === 'true') {
      return success({
        events: listEvents(),
      });
    }

    // Get user webhooks
    const webhooks = getWebhooks(userId);

    return success({
      userId,
      webhooks: webhooks.map(w => ({
        ...w,
        // Don't expose full secret
        secret: w.secret.substring(0, 12) + '...',
      })),
    }, { total: webhooks.length });

  } catch (err) {
    console.error('Webhooks error:', err);
    return serverError();
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Trigger event (for testing/internal use)
    if (body.action === 'trigger') {
      const validation = triggerEventSchema.safeParse(body);
      if (!validation.success) {
        return error(validation.error.issues[0]?.message || 'Datos inválidos');
      }

      const result = await triggerEvent(
        validation.data.event as WebhookEvent,
        validation.data.payload
      );

      return success({
        message: `Evento ${validation.data.event} disparado`,
        triggered: result.triggered,
        webhooks: result.webhooks,
      });
    }

    // Create webhook
    const validation = createWebhookSchema.safeParse(body);
    if (!validation.success) {
      return error(validation.error.issues[0]?.message || 'Datos inválidos');
    }

    const { userId = 'demo-user', url, events } = validation.data;

    const webhook = createWebhook(userId, url, events as WebhookEvent[]);

    return success({
      message: 'Webhook creado',
      webhook,
      note: 'Guarda el secret, no se mostrará de nuevo.',
    });

  } catch (err) {
    console.error('Create webhook error:', err);
    return serverError();
  }
}
