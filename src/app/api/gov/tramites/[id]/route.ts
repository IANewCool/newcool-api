import { success, notFound, serverError } from '@/lib/api-response';
import { getTramite, getService } from '@/lib/government';

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = await params;

    const tramite = getTramite(id);
    if (!tramite) {
      return notFound('Trámite no encontrado');
    }

    const service = getService(tramite.serviceId);

    return success({
      ...tramite,
      service: service ? {
        id: service.id,
        name: service.name,
        shortName: service.shortName,
        icon: service.icon,
        website: service.website,
        phone: service.phone,
      } : null,
      actionButtons: tramite.isOnline ? [
        { label: 'Iniciar Trámite Online', url: tramite.url, primary: true },
        { label: 'Agendar Cita', url: `/api/gov/citas?tramiteId=${id}`, primary: false },
      ] : [
        { label: 'Agendar Cita Presencial', url: `/api/gov/citas?tramiteId=${id}`, primary: true },
      ],
    });

  } catch (err) {
    console.error('Get tramite error:', err);
    return serverError();
  }
}
