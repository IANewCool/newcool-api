/**
 * NewCool Webhook System
 * Event-driven integrations for external services
 */

export type WebhookEvent =
  | 'user.created'
  | 'user.updated'
  | 'course.enrolled'
  | 'course.completed'
  | 'lesson.completed'
  | 'quiz.submitted'
  | 'cita.scheduled'
  | 'cita.confirmed'
  | 'cita.cancelled'
  | 'consulta.created'
  | 'consulta.completed'
  | 'achievement.unlocked'
  | 'session.started'
  | 'session.ended';

export interface Webhook {
  id: string;
  userId: string;
  url: string;
  events: WebhookEvent[];
  secret: string;
  active: boolean;
  createdAt: string;
  lastTriggered?: string;
  failureCount: number;
}

export interface WebhookDelivery {
  id: string;
  webhookId: string;
  event: WebhookEvent;
  payload: Record<string, unknown>;
  status: 'pending' | 'success' | 'failed';
  statusCode?: number;
  response?: string;
  attempts: number;
  createdAt: string;
  deliveredAt?: string;
}

// In-memory storage
const webhooksStore = new Map<string, Webhook>();
const deliveriesStore = new Map<string, WebhookDelivery[]>();

// Generate webhook secret
function generateSecret(): string {
  return 'whsec_' + Array.from({ length: 32 }, () =>
    Math.random().toString(36).charAt(2)
  ).join('');
}

/**
 * Create a new webhook
 */
export function createWebhook(
  userId: string,
  url: string,
  events: WebhookEvent[]
): Webhook {
  const webhook: Webhook = {
    id: `wh_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    userId,
    url,
    events,
    secret: generateSecret(),
    active: true,
    createdAt: new Date().toISOString(),
    failureCount: 0,
  };

  webhooksStore.set(webhook.id, webhook);
  return webhook;
}

/**
 * Get user webhooks
 */
export function getWebhooks(userId: string): Webhook[] {
  return Array.from(webhooksStore.values())
    .filter(w => w.userId === userId);
}

/**
 * Get a single webhook
 */
export function getWebhook(webhookId: string): Webhook | null {
  return webhooksStore.get(webhookId) || null;
}

/**
 * Update webhook
 */
export function updateWebhook(
  webhookId: string,
  updates: Partial<Pick<Webhook, 'url' | 'events' | 'active'>>
): Webhook | null {
  const webhook = webhooksStore.get(webhookId);
  if (!webhook) return null;

  if (updates.url !== undefined) webhook.url = updates.url;
  if (updates.events !== undefined) webhook.events = updates.events;
  if (updates.active !== undefined) webhook.active = updates.active;

  webhooksStore.set(webhookId, webhook);
  return webhook;
}

/**
 * Delete webhook
 */
export function deleteWebhook(webhookId: string): boolean {
  return webhooksStore.delete(webhookId);
}

/**
 * Regenerate webhook secret
 */
export function regenerateSecret(webhookId: string): Webhook | null {
  const webhook = webhooksStore.get(webhookId);
  if (!webhook) return null;

  webhook.secret = generateSecret();
  webhooksStore.set(webhookId, webhook);
  return webhook;
}

/**
 * Get webhook deliveries
 */
export function getDeliveries(webhookId: string, limit = 20): WebhookDelivery[] {
  const deliveries = deliveriesStore.get(webhookId) || [];
  return deliveries.slice(0, limit);
}

/**
 * Trigger webhook event (mock delivery)
 */
export async function triggerEvent(
  event: WebhookEvent,
  payload: Record<string, unknown>
): Promise<{ triggered: number; webhooks: string[] }> {
  const relevantWebhooks = Array.from(webhooksStore.values())
    .filter(w => w.active && w.events.includes(event));

  const triggeredIds: string[] = [];

  for (const webhook of relevantWebhooks) {
    const delivery: WebhookDelivery = {
      id: `del_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      webhookId: webhook.id,
      event,
      payload: {
        event,
        timestamp: new Date().toISOString(),
        data: payload,
      },
      status: 'pending',
      attempts: 0,
      createdAt: new Date().toISOString(),
    };

    // Mock delivery (in production, would make actual HTTP request)
    try {
      // Simulate delivery
      delivery.status = 'success';
      delivery.statusCode = 200;
      delivery.deliveredAt = new Date().toISOString();
      delivery.attempts = 1;
      webhook.lastTriggered = new Date().toISOString();
      triggeredIds.push(webhook.id);
    } catch {
      delivery.status = 'failed';
      delivery.attempts = 1;
      webhook.failureCount++;
    }

    // Store delivery
    const deliveries = deliveriesStore.get(webhook.id) || [];
    deliveries.unshift(delivery);
    if (deliveries.length > 100) deliveries.pop();
    deliveriesStore.set(webhook.id, deliveries);
  }

  return { triggered: triggeredIds.length, webhooks: triggeredIds };
}

/**
 * List all available webhook events
 */
export function listEvents(): { event: WebhookEvent; description: string }[] {
  return [
    { event: 'user.created', description: 'Usuario creado' },
    { event: 'user.updated', description: 'Usuario actualizado' },
    { event: 'course.enrolled', description: 'Inscripción a curso' },
    { event: 'course.completed', description: 'Curso completado' },
    { event: 'lesson.completed', description: 'Lección completada' },
    { event: 'quiz.submitted', description: 'Quiz enviado' },
    { event: 'cita.scheduled', description: 'Cita agendada' },
    { event: 'cita.confirmed', description: 'Cita confirmada' },
    { event: 'cita.cancelled', description: 'Cita cancelada' },
    { event: 'consulta.created', description: 'Consulta creada' },
    { event: 'consulta.completed', description: 'Consulta completada' },
    { event: 'achievement.unlocked', description: 'Logro desbloqueado' },
    { event: 'session.started', description: 'Sesión Mind OS iniciada' },
    { event: 'session.ended', description: 'Sesión Mind OS terminada' },
  ];
}

// Seed demo webhook
function seedDemoWebhook() {
  createWebhook('demo-user', 'https://example.com/webhook', [
    'course.enrolled',
    'course.completed',
    'quiz.submitted',
  ]);
}

seedDemoWebhook();
