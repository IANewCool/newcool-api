import { success, error, serverError } from '@/lib/api-response';
import { cognitiveModes, getModesByCategory, getFreeModes, getPremiumModes } from '@/lib/mind-os';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const tier = searchParams.get('tier'); // 'free' or 'premium'

    let modes = cognitiveModes;

    // Filter by category
    if (category) {
      const validCategories = ['focus', 'creative', 'learning', 'wellness', 'productivity'];
      if (!validCategories.includes(category)) {
        return error(`Invalid category. Must be one of: ${validCategories.join(', ')}`);
      }
      modes = getModesByCategory(category as typeof modes[0]['category']);
    }

    // Filter by tier
    if (tier === 'free') {
      modes = modes.filter(m => !m.isPremium);
    } else if (tier === 'premium') {
      modes = modes.filter(m => m.isPremium);
    }

    return success({
      modes,
      stats: {
        total: modes.length,
        free: modes.filter(m => !m.isPremium).length,
        premium: modes.filter(m => m.isPremium).length,
      },
    });

  } catch (err) {
    console.error('Modes error:', err);
    return serverError();
  }
}
