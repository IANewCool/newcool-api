import { success, notFound, serverError } from '@/lib/api-response';
import { getService, getServiceTramites } from '@/lib/government';

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = await params;

    const service = getService(id);
    if (!service) {
      return notFound('Servicio no encontrado');
    }

    const tramites = getServiceTramites(id);

    return success({
      ...service,
      tramites: tramites.map(t => ({
        id: t.id,
        name: t.name,
        description: t.description,
        isOnline: t.isOnline,
        cost: t.cost,
        duration: t.duration,
      })),
      contact: {
        website: service.website,
        phone: service.phone,
      },
    });

  } catch (err) {
    console.error('Get service error:', err);
    return serverError();
  }
}
