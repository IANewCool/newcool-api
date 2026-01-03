import { success, error, notFound, serverError } from '@/lib/api-response';
import {
  getWebhook,
  updateWebhook,
  deleteWebhook,
  regenerateSecret,
  getDeliveries,
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

const updateWebhookSchema = z.object({
  url: z.string().url().optional(),
  events: z.array(z.enum(webhookEvents)).min(1).optional(),
  active: z.boolean().optional(),
});

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);

    const webhook = getWebhook(id);
    if (!webhook) {
      return notFound('Webhook no encontrado');
    }

    // Get deliveries
    if (searchParams.get('deliveries') === 'true') {
      const limit = parseInt(searchParams.get('limit') || '20');
      const deliveries = getDeliveries(id, Math.min(limit, 100));
      return success({
        webhookId: id,
        deliveries,
      }, { total: deliveries.length });
    }

    return success({
      ...webhook,
      // Don't expose full secret on GET
      secret: webhook.secret.substring(0, 12) + '...',
    });

  } catch (err) {
    console.error('Get webhook error:', err);
    return serverError();
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Regenerate secret
    if (body.action === 'regenerateSecret') {
      const webhook = regenerateSecret(id);
      if (!webhook) {
        return notFound('Webhook no encontrado');
      }

      return success({
        message: 'Secret regenerado',
        webhook,
        note: 'Guarda el nuevo secret, no se mostrará de nuevo.',
      });
    }

    // Update webhook
    const validation = updateWebhookSchema.safeParse(body);
    if (!validation.success) {
      return error(validation.error.issues[0]?.message || 'Datos inválidos');
    }

    const webhook = updateWebhook(id, {
      ...validation.data,
      events: validation.data.events as WebhookEvent[] | undefined,
    });

    if (!webhook) {
      return notFound('Webhook no encontrado');
    }

    return success({
      message: 'Webhook actualizado',
      webhook: {
        ...webhook,
        secret: webhook.secret.substring(0, 12) + '...',
      },
    });

  } catch (err) {
    console.error('Update webhook error:', err);
    return serverError();
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const { id } = await params;

    const deleted = deleteWebhook(id);
    if (!deleted) {
      return notFound('Webhook no encontrado');
    }

    return success({
      message: 'Webhook eliminado',
      id,
    });

  } catch (err) {
    console.error('Delete webhook error:', err);
    return serverError();
  }
}
