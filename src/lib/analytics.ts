/**
 * NewCool Analytics System
 * Platform-wide metrics, user analytics, and dashboard data
 */

export interface PlatformStats {
  users: {
    total: number;
    active: number;
    newThisWeek: number;
    newThisMonth: number;
  };
  courses: {
    total: number;
    enrollments: number;
    completions: number;
    avgCompletionRate: number;
  };
  music: {
    totalTracks: number;
    totalPlays: number;
    totalLikes: number;
    topGenre: string;
  };
  government: {
    totalServices: number;
    totalTramites: number;
    citasScheduled: number;
    consultasCreated: number;
  };
  mindOs: {
    totalSessions: number;
    totalMinutes: number;
    avgSessionLength: number;
    topMode: string;
  };
}

export interface UserAnalytics {
  userId: string;
  engagement: {
    totalSessions: number;
    avgSessionDuration: number;
    lastActive: string;
    streak: number;
  };
  learning: {
    coursesEnrolled: number;
    coursesCompleted: number;
    lessonsCompleted: number;
    quizzesPassed: number;
    totalStudyMinutes: number;
  };
  music: {
    tracksPlayed: number;
    favoriteGenre: string;
    totalListenMinutes: number;
  };
  government: {
    citasScheduled: number;
    citasCompleted: number;
    consultasMade: number;
  };
  mindOs: {
    sessionsCompleted: number;
    totalMinutes: number;
    favoriteMode: string;
    level: number;
  };
}

export interface TimeSeriesData {
  date: string;
  value: number;
}

export interface DashboardData {
  overview: {
    totalUsers: number;
    activeToday: number;
    revenue: number;
    growth: number;
  };
  charts: {
    userGrowth: TimeSeriesData[];
    engagement: TimeSeriesData[];
    courseEnrollments: TimeSeriesData[];
    musicPlays: TimeSeriesData[];
  };
  topContent: {
    courses: { id: string; title: string; enrollments: number }[];
    tracks: { id: string; title: string; plays: number }[];
    modes: { id: string; name: string; sessions: number }[];
  };
  recentActivity: {
    type: string;
    description: string;
    timestamp: string;
  }[];
}

// Generate mock time series data
function generateTimeSeries(days: number, baseValue: number, variance: number): TimeSeriesData[] {
  const data: TimeSeriesData[] = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.round(baseValue + (Math.random() - 0.5) * variance),
    });
  }

  return data;
}

/**
 * Get platform-wide statistics
 */
export function getPlatformStats(): PlatformStats {
  return {
    users: {
      total: 15420,
      active: 8750,
      newThisWeek: 342,
      newThisMonth: 1245,
    },
    courses: {
      total: 11,
      enrollments: 28450,
      completions: 12380,
      avgCompletionRate: 43.5,
    },
    music: {
      totalTracks: 25,
      totalPlays: 623800,
      totalLikes: 48900,
      topGenre: 'reggaeton',
    },
    government: {
      totalServices: 12,
      totalTramites: 15,
      citasScheduled: 4520,
      consultasCreated: 8930,
    },
    mindOs: {
      totalSessions: 45200,
      totalMinutes: 892000,
      avgSessionLength: 19.7,
      topMode: 'deep-focus',
    },
  };
}

/**
 * Get user-specific analytics
 */
export function getUserAnalytics(userId: string): UserAnalytics {
  // In production, this would query actual user data
  return {
    userId,
    engagement: {
      totalSessions: 48,
      avgSessionDuration: 25,
      lastActive: new Date().toISOString(),
      streak: 7,
    },
    learning: {
      coursesEnrolled: 3,
      coursesCompleted: 1,
      lessonsCompleted: 24,
      quizzesPassed: 8,
      totalStudyMinutes: 420,
    },
    music: {
      tracksPlayed: 156,
      favoriteGenre: 'reggaeton',
      totalListenMinutes: 312,
    },
    government: {
      citasScheduled: 2,
      citasCompleted: 1,
      consultasMade: 5,
    },
    mindOs: {
      sessionsCompleted: 15,
      totalMinutes: 285,
      favoriteMode: 'deep-focus',
      level: 3,
    },
  };
}

/**
 * Get dashboard data for admin panel
 */
export function getDashboardData(): DashboardData {
  return {
    overview: {
      totalUsers: 15420,
      activeToday: 2340,
      revenue: 45230,
      growth: 12.5,
    },
    charts: {
      userGrowth: generateTimeSeries(30, 50, 30),
      engagement: generateTimeSeries(30, 2500, 500),
      courseEnrollments: generateTimeSeries(30, 120, 40),
      musicPlays: generateTimeSeries(30, 8500, 2000),
    },
    topContent: {
      courses: [
        { id: 'math-101', title: 'Matemáticas Fundamentales', enrollments: 4520 },
        { id: 'english-101', title: 'English Basics', enrollments: 3890 },
        { id: 'science-101', title: 'Ciencias Naturales', enrollments: 2780 },
        { id: 'spanish-101', title: 'Lenguaje y Comunicación', enrollments: 2450 },
        { id: 'history-101', title: 'Historia de Chile', enrollments: 1980 },
      ],
      tracks: [
        { id: 't001', title: 'Tabla del 2', plays: 45230 },
        { id: 't002', title: 'Tabla del 5', plays: 38920 },
        { id: 't010', title: 'Hidrógeno Trap', plays: 32100 },
        { id: 't015', title: 'Cumbia de los Continentes', plays: 28450 },
        { id: 't020', title: 'Rock de los Verbos', plays: 24680 },
      ],
      modes: [
        { id: 'deep-focus', name: 'Deep Focus', sessions: 12450 },
        { id: 'rapid-learn', name: 'Rapid Learning', sessions: 8920 },
        { id: 'task-crusher', name: 'Task Crusher', sessions: 6780 },
        { id: 'creative-spark', name: 'Creative Spark', sessions: 5430 },
        { id: 'mindful-break', name: 'Mindful Break', sessions: 4890 },
      ],
    },
    recentActivity: [
      { type: 'enrollment', description: 'Nuevo usuario inscrito en Matemáticas Fundamentales', timestamp: new Date(Date.now() - 120000).toISOString() },
      { type: 'completion', description: 'Usuario completó curso English Basics', timestamp: new Date(Date.now() - 300000).toISOString() },
      { type: 'cita', description: 'Nueva cita agendada en Registro Civil', timestamp: new Date(Date.now() - 450000).toISOString() },
      { type: 'session', description: 'Sesión Mind OS completada: Deep Focus', timestamp: new Date(Date.now() - 600000).toISOString() },
      { type: 'quiz', description: 'Quiz aprobado: Suma básica (95%)', timestamp: new Date(Date.now() - 900000).toISOString() },
    ],
  };
}

/**
 * Get metrics for a specific time range
 */
export function getMetrics(
  metric: 'users' | 'enrollments' | 'plays' | 'sessions' | 'citas',
  period: 'day' | 'week' | 'month' | 'year'
): { current: number; previous: number; change: number; data: TimeSeriesData[] } {
  const periodDays = { day: 1, week: 7, month: 30, year: 365 };
  const days = periodDays[period];

  const baseValues = {
    users: { base: 50, variance: 20 },
    enrollments: { base: 120, variance: 40 },
    plays: { base: 8500, variance: 2000 },
    sessions: { base: 1500, variance: 400 },
    citas: { base: 45, variance: 15 },
  };

  const { base, variance } = baseValues[metric];
  const data = generateTimeSeries(days, base, variance);

  const current = data.slice(-Math.ceil(days / 2)).reduce((sum, d) => sum + d.value, 0);
  const previous = data.slice(0, Math.ceil(days / 2)).reduce((sum, d) => sum + d.value, 0);
  const change = previous > 0 ? ((current - previous) / previous) * 100 : 0;

  return { current, previous, change: Math.round(change * 10) / 10, data };
}

/**
 * Track an event (for real-time analytics)
 */
export function trackEvent(
  userId: string,
  event: string,
  properties?: Record<string, unknown>
): { tracked: boolean; eventId: string } {
  const eventId = `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // In production, this would store to analytics database/service
  console.log(`[Analytics] ${event}`, { userId, eventId, properties });

  return { tracked: true, eventId };
}

/**
 * Get conversion funnel data
 */
export function getFunnelData(funnel: 'onboarding' | 'course' | 'purchase'): {
  steps: { name: string; count: number; rate: number }[];
  overallRate: number;
} {
  const funnels = {
    onboarding: [
      { name: 'Visita', count: 10000, rate: 100 },
      { name: 'Registro', count: 3500, rate: 35 },
      { name: 'Perfil Completado', count: 2800, rate: 80 },
      { name: 'Primer Curso', count: 2100, rate: 75 },
      { name: 'Primera Lección', count: 1680, rate: 80 },
    ],
    course: [
      { name: 'Vista Curso', count: 5000, rate: 100 },
      { name: 'Inscripción', count: 2500, rate: 50 },
      { name: '25% Completado', count: 1875, rate: 75 },
      { name: '50% Completado', count: 1250, rate: 67 },
      { name: '100% Completado', count: 875, rate: 70 },
    ],
    purchase: [
      { name: 'Vista Premium', count: 8000, rate: 100 },
      { name: 'Click Comprar', count: 2400, rate: 30 },
      { name: 'Checkout', count: 1680, rate: 70 },
      { name: 'Pago Completado', count: 1344, rate: 80 },
    ],
  };

  const steps = funnels[funnel];
  const overallRate = (steps[steps.length - 1].count / steps[0].count) * 100;

  return { steps, overallRate: Math.round(overallRate * 10) / 10 };
}
