import { success, error, serverError } from '@/lib/api-response';
import { getUserProfile, updateUserProfile, defaultAchievements } from '@/lib/mind-os';
import { z } from 'zod';

const updateProfileSchema = z.object({
  preferredModes: z.array(z.string()).optional(),
  learningStyle: z.enum(['visual', 'auditory', 'kinesthetic', 'reading']).optional(),
  preferences: z.object({
    theme: z.enum(['light', 'dark', 'auto']).optional(),
    notifications: z.boolean().optional(),
    soundEnabled: z.boolean().optional(),
    dailyGoalMinutes: z.number().min(5).max(480).optional(),
    preferredSessionLength: z.number().min(5).max(120).optional(),
  }).optional(),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    // In production, get userId from auth token
    const userId = searchParams.get('userId') || 'demo-user';

    const profile = getUserProfile(userId);

    // Calculate level based on total minutes
    const level = Math.floor(profile.totalMinutes / 60) + 1;
    const nextLevelMinutes = level * 60;
    const progressToNextLevel = (profile.totalMinutes % 60) / 60;

    return success({
      ...profile,
      level,
      nextLevelMinutes,
      progressToNextLevel,
      availableAchievements: defaultAchievements,
    });

  } catch (err) {
    console.error('Profile error:', err);
    return serverError();
  }
}

export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'demo-user';

    const body = await request.json();
    const validation = updateProfileSchema.safeParse(body);

    if (!validation.success) {
      return error(validation.error.issues[0]?.message || 'Invalid update data');
    }

    const updates = validation.data;
    const currentProfile = getUserProfile(userId);

    // Merge preferences
    if (updates.preferences) {
      updates.preferences = {
        ...currentProfile.preferences,
        ...updates.preferences,
      } as typeof currentProfile.preferences;
    }

    const updatedProfile = updateUserProfile(userId, updates as Partial<typeof currentProfile>);

    return success({
      message: 'Profile updated successfully',
      profile: updatedProfile,
    });

  } catch (err) {
    console.error('Update profile error:', err);
    return serverError();
  }
}
