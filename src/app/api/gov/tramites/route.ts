import { success, error, serverError } from '@/lib/api-response';
import { tramites, getService } from '@/lib/government';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const serviceId = searchParams.get('serviceId');
    const online = searchParams.get('online');
    const free = searchParams.get('free');

    let results = [...tramites];

    // Filter by service
    if (serviceId) {
      results = results.filter(t => t.serviceId === serviceId);
    }

    // Filter by online availability
    if (online === 'true') {
      results = results.filter(t => t.isOnline);
    }

    // Filter by cost
    if (free === 'true') {
      results = results.filter(t => t.cost === 'gratis');
    }

    // Enrich with service info
    const enriched = results.map(tramite => {
      const service = getService(tramite.serviceId);
      return {
        ...tramite,
        service: service ? {
          id: service.id,
          name: service.shortName,
          icon: service.icon,
        } : null,
      };
    });

    return success({
      tramites: enriched,
    }, { total: results.length });

  } catch (err) {
    console.error('Tramites error:', err);
    return serverError();
  }
}
