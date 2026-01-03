/**
 * NewCool Notifications System
 * Real-time notifications for courses, citas, achievements, and system events
 */

export type NotificationType = 'course' | 'cita' | 'achievement' | 'quiz' | 'system' | 'reminder';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  icon?: string;
  link?: string;
  read: boolean;
  createdAt: string;
  expiresAt?: string;
  metadata?: Record<string, unknown>;
}

export interface NotificationPreferences {
  userId: string;
  email: boolean;
  push: boolean;
  sms: boolean;
  types: {
    course: boolean;
    cita: boolean;
    achievement: boolean;
    quiz: boolean;
    system: boolean;
    reminder: boolean;
  };
  quietHours?: {
    enabled: boolean;
    start: string; // HH:MM
    end: string;   // HH:MM
  };
}

// In-memory storage (would be database in production)
const notificationsStore = new Map<string, Notification[]>();
const preferencesStore = new Map<string, NotificationPreferences>();

// Default preferences
const defaultPreferences: Omit<NotificationPreferences, 'userId'> = {
  email: true,
  push: true,
  sms: false,
  types: {
    course: true,
    cita: true,
    achievement: true,
    quiz: true,
    system: true,
    reminder: true,
  },
};

// Icons by type
const typeIcons: Record<NotificationType, string> = {
  course: '📚',
  cita: '📅',
  achievement: '🏆',
  quiz: '✅',
  system: '🔔',
  reminder: '⏰',
};

/**
 * Create a new notification
 */
export function createNotification(
  userId: string,
  type: NotificationType,
  title: string,
  message: string,
  options?: {
    link?: string;
    expiresAt?: string;
    metadata?: Record<string, unknown>;
  }
): Notification {
  const notification: Notification = {
    id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    userId,
    type,
    title,
    message,
    icon: typeIcons[type],
    link: options?.link,
    read: false,
    createdAt: new Date().toISOString(),
    expiresAt: options?.expiresAt,
    metadata: options?.metadata,
  };

  const userNotifications = notificationsStore.get(userId) || [];
  userNotifications.unshift(notification);

  // Keep only last 100 notifications per user
  if (userNotifications.length > 100) {
    userNotifications.pop();
  }

  notificationsStore.set(userId, userNotifications);

  return notification;
}

/**
 * Get user notifications
 */
export function getNotifications(
  userId: string,
  options?: {
    unreadOnly?: boolean;
    type?: NotificationType;
    limit?: number;
    offset?: number;
  }
): { notifications: Notification[]; total: number; unreadCount: number } {
  let notifications = notificationsStore.get(userId) || [];

  // Filter expired
  const now = new Date();
  notifications = notifications.filter(n =>
    !n.expiresAt || new Date(n.expiresAt) > now
  );

  const unreadCount = notifications.filter(n => !n.read).length;
  const total = notifications.length;

  // Apply filters
  if (options?.unreadOnly) {
    notifications = notifications.filter(n => !n.read);
  }

  if (options?.type) {
    notifications = notifications.filter(n => n.type === options.type);
  }

  // Pagination
  const offset = options?.offset || 0;
  const limit = options?.limit || 20;
  notifications = notifications.slice(offset, offset + limit);

  return { notifications, total, unreadCount };
}

/**
 * Get a single notification
 */
export function getNotification(notificationId: string): Notification | null {
  for (const notifications of notificationsStore.values()) {
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) return notification;
  }
  return null;
}

/**
 * Mark notification as read
 */
export function markAsRead(notificationId: string): Notification | null {
  for (const [userId, notifications] of notificationsStore.entries()) {
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      return notification;
    }
  }
  return null;
}

/**
 * Mark all user notifications as read
 */
export function markAllAsRead(userId: string): number {
  const notifications = notificationsStore.get(userId) || [];
  let count = 0;

  notifications.forEach(n => {
    if (!n.read) {
      n.read = true;
      count++;
    }
  });

  return count;
}

/**
 * Delete a notification
 */
export function deleteNotification(notificationId: string): boolean {
  for (const [userId, notifications] of notificationsStore.entries()) {
    const index = notifications.findIndex(n => n.id === notificationId);
    if (index !== -1) {
      notifications.splice(index, 1);
      return true;
    }
  }
  return false;
}

/**
 * Get user notification preferences
 */
export function getPreferences(userId: string): NotificationPreferences {
  return preferencesStore.get(userId) || { userId, ...defaultPreferences };
}

/**
 * Update user notification preferences
 */
export function updatePreferences(
  userId: string,
  updates: {
    email?: boolean;
    push?: boolean;
    sms?: boolean;
    types?: Partial<NotificationPreferences['types']>;
    quietHours?: NotificationPreferences['quietHours'];
  }
): NotificationPreferences {
  const current = getPreferences(userId);
  const updated: NotificationPreferences = {
    ...current,
    ...(updates.email !== undefined && { email: updates.email }),
    ...(updates.push !== undefined && { push: updates.push }),
    ...(updates.sms !== undefined && { sms: updates.sms }),
    ...(updates.quietHours !== undefined && { quietHours: updates.quietHours }),
    types: { ...current.types, ...updates.types },
  };
  preferencesStore.set(userId, updated);
  return updated;
}

/**
 * Create course-related notification
 */
export function notifyCourseEvent(
  userId: string,
  event: 'enrolled' | 'completed' | 'newLesson' | 'certificate',
  courseName: string,
  courseId: string
): Notification {
  const messages = {
    enrolled: `Te has inscrito en ${courseName}`,
    completed: `Has completado el curso ${courseName}`,
    newLesson: `Nueva lección disponible en ${courseName}`,
    certificate: `Tu certificado de ${courseName} está listo`,
  };

  const titles = {
    enrolled: 'Inscripción Exitosa',
    completed: 'Curso Completado',
    newLesson: 'Nueva Lección',
    certificate: 'Certificado Disponible',
  };

  return createNotification(userId, 'course', titles[event], messages[event], {
    link: `/courses/${courseId}`,
    metadata: { courseId, event },
  });
}

/**
 * Create cita-related notification
 */
export function notifyCitaEvent(
  userId: string,
  event: 'scheduled' | 'confirmed' | 'reminder' | 'cancelled',
  serviceName: string,
  citaId: string,
  date?: string
): Notification {
  const messages = {
    scheduled: `Cita agendada en ${serviceName}`,
    confirmed: `Tu cita en ${serviceName} ha sido confirmada`,
    reminder: `Recordatorio: Tienes cita en ${serviceName} ${date ? `el ${date}` : 'pronto'}`,
    cancelled: `Tu cita en ${serviceName} ha sido cancelada`,
  };

  const titles = {
    scheduled: 'Cita Agendada',
    confirmed: 'Cita Confirmada',
    reminder: 'Recordatorio de Cita',
    cancelled: 'Cita Cancelada',
  };

  return createNotification(
    userId,
    event === 'reminder' ? 'reminder' : 'cita',
    titles[event],
    messages[event],
    {
      link: `/citas/${citaId}`,
      metadata: { citaId, event, serviceName },
    }
  );
}

/**
 * Create achievement notification
 */
export function notifyAchievement(
  userId: string,
  achievementName: string,
  description: string
): Notification {
  return createNotification(
    userId,
    'achievement',
    achievementName,
    description,
    {
      link: '/profile/achievements',
      metadata: { achievementName },
    }
  );
}

/**
 * Create quiz result notification
 */
export function notifyQuizResult(
  userId: string,
  quizName: string,
  score: number,
  passed: boolean
): Notification {
  const title = passed ? 'Quiz Aprobado' : 'Quiz Completado';
  const message = passed
    ? `Obtuviste ${score}% en ${quizName}`
    : `Obtuviste ${score}% en ${quizName}. Sigue practicando.`;

  return createNotification(userId, 'quiz', title, message, {
    metadata: { quizName, score, passed },
  });
}

/**
 * Create system notification
 */
export function notifySystem(
  userId: string,
  title: string,
  message: string
): Notification {
  return createNotification(userId, 'system', title, message);
}

// Seed some demo notifications
function seedDemoNotifications() {
  const demoUser = 'demo-user';

  createNotification(demoUser, 'system', 'Bienvenido a NewCool', 'Tu cuenta está lista. Explora los cursos disponibles.', {
    link: '/courses',
  });

  createNotification(demoUser, 'course', 'Curso Recomendado', 'Matemáticas Fundamentales es perfecto para comenzar', {
    link: '/courses/math-101',
    metadata: { courseId: 'math-101' },
  });

  createNotification(demoUser, 'achievement', 'Primera Visita', 'Has iniciado tu viaje de aprendizaje', {
    link: '/profile/achievements',
  });
}

// Initialize demo data
seedDemoNotifications();
