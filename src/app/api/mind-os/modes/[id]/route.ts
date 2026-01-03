import { success, notFound, serverError } from '@/lib/api-response';
import { getMode } from '@/lib/mind-os';

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = await params;

    const mode = getMode(id);
    if (!mode) {
      return notFound('Cognitive mode not found');
    }

    // Add session guide
    const sessionGuide = {
      preparation: [
        'Find a quiet, comfortable space',
        'Minimize potential distractions',
        'Have water nearby',
        'Set your intention for this session',
      ],
      duringSession: mode.techniques,
      afterSession: [
        'Take a moment to reflect',
        'Note any insights or progress',
        'Hydrate and stretch',
        'Plan your next session',
      ],
    };

    return success({
      ...mode,
      sessionGuide,
    });

  } catch (err) {
    console.error('Get mode error:', err);
    return serverError();
  }
}
