/**
 * Mind OS - Cognitive Enhancement System
 * Premium personalized learning and productivity platform
 */

export interface CognitiveMode {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  benefits: string[];
  techniques: string[];
  duration: number; // recommended session duration in minutes
  isPremium: boolean;
  category: 'focus' | 'creative' | 'learning' | 'wellness' | 'productivity';
}

export interface UserProfile {
  userId: string;
  preferredModes: string[];
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  focusScore: number; // 0-100
  creativityScore: number; // 0-100
  totalSessions: number;
  totalMinutes: number;
  streak: number; // consecutive days
  achievements: Achievement[];
  preferences: UserPreferences;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  notifications: boolean;
  soundEnabled: boolean;
  dailyGoalMinutes: number;
  preferredSessionLength: number;
}

export interface Session {
  id: string;
  userId: string;
  modeId: string;
  startedAt: string;
  endedAt?: string;
  duration: number; // actual duration in minutes
  completed: boolean;
  rating?: number; // 1-5
  notes?: string;
}

// Cognitive Modes Catalog
export const cognitiveModes: CognitiveMode[] = [
  // Focus Modes
  {
    id: 'deep-focus',
    name: 'Deep Focus',
    description: 'Eliminate distractions and enter a state of deep concentration for complex tasks',
    icon: '🎯',
    color: '#3b82f6',
    benefits: ['Enhanced concentration', 'Reduced mental fatigue', 'Improved task completion'],
    techniques: ['Pomodoro intervals', 'Ambient sounds', 'Distraction blocking'],
    duration: 45,
    isPremium: false,
    category: 'focus',
  },
  {
    id: 'flow-state',
    name: 'Flow State',
    description: 'Achieve optimal performance through perfect challenge-skill balance',
    icon: '🌊',
    color: '#06b6d4',
    benefits: ['Peak performance', 'Time distortion', 'Intrinsic motivation'],
    techniques: ['Progressive difficulty', 'Immediate feedback', 'Clear goals'],
    duration: 60,
    isPremium: true,
    category: 'focus',
  },

  // Creative Modes
  {
    id: 'creative-spark',
    name: 'Creative Spark',
    description: 'Unlock your imagination and generate innovative ideas',
    icon: '✨',
    color: '#f59e0b',
    benefits: ['Enhanced ideation', 'Divergent thinking', 'Novel connections'],
    techniques: ['Mind mapping', 'Random stimulus', 'Constraint removal'],
    duration: 30,
    isPremium: false,
    category: 'creative',
  },
  {
    id: 'artistic-flow',
    name: 'Artistic Flow',
    description: 'Enter a meditative creative state for artistic expression',
    icon: '🎨',
    color: '#ec4899',
    benefits: ['Uninhibited expression', 'Emotional release', 'Aesthetic sensitivity'],
    techniques: ['Freeform creation', 'Mood music', 'Visual inspiration'],
    duration: 45,
    isPremium: true,
    category: 'creative',
  },

  // Learning Modes
  {
    id: 'rapid-learn',
    name: 'Rapid Learning',
    description: 'Accelerate knowledge acquisition through optimized learning techniques',
    icon: '📚',
    color: '#10b981',
    benefits: ['Faster comprehension', 'Better retention', 'Active recall'],
    techniques: ['Spaced repetition', 'Active testing', 'Interleaving'],
    duration: 25,
    isPremium: false,
    category: 'learning',
  },
  {
    id: 'memory-palace',
    name: 'Memory Palace',
    description: 'Build lasting memories using advanced mnemonic techniques',
    icon: '🏛️',
    color: '#8b5cf6',
    benefits: ['Long-term retention', 'Visual memory', 'Association building'],
    techniques: ['Method of loci', 'Visualization', 'Story linking'],
    duration: 30,
    isPremium: true,
    category: 'learning',
  },

  // Wellness Modes
  {
    id: 'mindful-break',
    name: 'Mindful Break',
    description: 'Reset your mind with guided mindfulness and breathing exercises',
    icon: '🧘',
    color: '#14b8a6',
    benefits: ['Stress reduction', 'Mental clarity', 'Emotional balance'],
    techniques: ['Box breathing', 'Body scan', 'Gratitude practice'],
    duration: 10,
    isPremium: false,
    category: 'wellness',
  },
  {
    id: 'energy-boost',
    name: 'Energy Boost',
    description: 'Revitalize your energy levels through movement and activation',
    icon: '⚡',
    color: '#f97316',
    benefits: ['Increased alertness', 'Physical activation', 'Mood elevation'],
    techniques: ['Micro-exercises', 'Power poses', 'Energizing music'],
    duration: 5,
    isPremium: false,
    category: 'wellness',
  },

  // Productivity Modes
  {
    id: 'task-crusher',
    name: 'Task Crusher',
    description: 'Power through your to-do list with maximum efficiency',
    icon: '💪',
    color: '#ef4444',
    benefits: ['High output', 'Task completion', 'Momentum building'],
    techniques: ['Time boxing', 'Batch processing', 'Priority matrix'],
    duration: 30,
    isPremium: false,
    category: 'productivity',
  },
  {
    id: 'strategic-planning',
    name: 'Strategic Planning',
    description: 'Big picture thinking for goals and long-term planning',
    icon: '🗺️',
    color: '#6366f1',
    benefits: ['Clear vision', 'Goal alignment', 'Action planning'],
    techniques: ['SMART goals', 'Backward planning', 'Priority setting'],
    duration: 45,
    isPremium: true,
    category: 'productivity',
  },
];

// Default achievements
export const defaultAchievements: Achievement[] = [
  { id: 'first-session', name: 'First Steps', description: 'Complete your first Mind OS session', icon: '🌟', unlockedAt: '' },
  { id: 'week-streak', name: 'Week Warrior', description: 'Maintain a 7-day streak', icon: '🔥', unlockedAt: '' },
  { id: 'focus-master', name: 'Focus Master', description: 'Complete 10 focus sessions', icon: '🎯', unlockedAt: '' },
  { id: 'creative-genius', name: 'Creative Genius', description: 'Complete 10 creative sessions', icon: '💡', unlockedAt: '' },
  { id: 'learning-machine', name: 'Learning Machine', description: 'Complete 10 learning sessions', icon: '📖', unlockedAt: '' },
  { id: 'zen-master', name: 'Zen Master', description: 'Complete 20 wellness sessions', icon: '🧘', unlockedAt: '' },
  { id: 'productivity-ninja', name: 'Productivity Ninja', description: 'Complete 50 total sessions', icon: '⚡', unlockedAt: '' },
  { id: 'mind-architect', name: 'Mind Architect', description: 'Try all cognitive modes', icon: '🏗️', unlockedAt: '' },
];

// In-memory storage (would be database in production)
const userProfiles: Map<string, UserProfile> = new Map();
const sessions: Map<string, Session> = new Map();

// Helper functions
export function getMode(id: string): CognitiveMode | undefined {
  return cognitiveModes.find(m => m.id === id);
}

export function getModesByCategory(category: CognitiveMode['category']): CognitiveMode[] {
  return cognitiveModes.filter(m => m.category === category);
}

export function getFreeModes(): CognitiveMode[] {
  return cognitiveModes.filter(m => !m.isPremium);
}

export function getPremiumModes(): CognitiveMode[] {
  return cognitiveModes.filter(m => m.isPremium);
}

export function getUserProfile(userId: string): UserProfile {
  if (!userProfiles.has(userId)) {
    userProfiles.set(userId, {
      userId,
      preferredModes: ['deep-focus', 'rapid-learn'],
      learningStyle: 'visual',
      focusScore: 50,
      creativityScore: 50,
      totalSessions: 0,
      totalMinutes: 0,
      streak: 0,
      achievements: [],
      preferences: {
        theme: 'dark',
        notifications: true,
        soundEnabled: true,
        dailyGoalMinutes: 30,
        preferredSessionLength: 25,
      },
    });
  }
  return userProfiles.get(userId)!;
}

export function updateUserProfile(userId: string, updates: Partial<UserProfile>): UserProfile {
  const profile = getUserProfile(userId);
  const updated = { ...profile, ...updates };
  userProfiles.set(userId, updated);
  return updated;
}

export function startSession(userId: string, modeId: string): Session {
  const session: Session = {
    id: `sess_${Date.now()}`,
    userId,
    modeId,
    startedAt: new Date().toISOString(),
    duration: 0,
    completed: false,
  };
  sessions.set(session.id, session);
  return session;
}

export function endSession(sessionId: string, rating?: number, notes?: string): Session | undefined {
  const session = sessions.get(sessionId);
  if (!session) return undefined;

  const endedAt = new Date();
  const startedAt = new Date(session.startedAt);
  const duration = Math.round((endedAt.getTime() - startedAt.getTime()) / 60000);

  const updated: Session = {
    ...session,
    endedAt: endedAt.toISOString(),
    duration,
    completed: true,
    rating,
    notes,
  };
  sessions.set(sessionId, updated);

  // Update user profile
  const profile = getUserProfile(session.userId);
  profile.totalSessions += 1;
  profile.totalMinutes += duration;
  userProfiles.set(session.userId, profile);

  return updated;
}

export function getUserSessions(userId: string): Session[] {
  return Array.from(sessions.values()).filter(s => s.userId === userId);
}

export function getStats() {
  return {
    totalModes: cognitiveModes.length,
    freeModes: getFreeModes().length,
    premiumModes: getPremiumModes().length,
    categories: ['focus', 'creative', 'learning', 'wellness', 'productivity'],
    totalUsers: userProfiles.size,
    totalSessions: sessions.size,
  };
}
