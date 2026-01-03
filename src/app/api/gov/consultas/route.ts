import { success, error, notFound, serverError } from '@/lib/api-response';
import { createConsulta, getConsulta, getUserConsultas, getService } from '@/lib/government';
import { z } from 'zod';

const createConsultaSchema = z.object({
  userId: z.string().optional(),
  serviceId: z.string(),
  type: z.enum(['certificate', 'status', 'debt', 'history']),
  query: z.record(z.string(), z.string()),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'demo-user';
    const consultaId = searchParams.get('id');

    // Get specific consulta
    if (consultaId) {
      const consulta = getConsulta(consultaId);
      if (!consulta) {
        return notFound('Consulta no encontrada');
      }
      const service = getService(consulta.serviceId);
      return success({
        ...consulta,
        service: service ? { id: service.id, name: service.shortName, icon: service.icon } : null,
      });
    }

    // Get all user consultas
    const consultas = getUserConsultas(userId);

    // Enrich with service info
    const enriched = consultas.map(consulta => {
      const service = getService(consulta.serviceId);
      return {
        ...consulta,
        service: service ? { id: service.id, name: service.shortName, icon: service.icon } : null,
      };
    });

    // Sort by date
    enriched.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return success({
      userId,
      consultas: enriched,
    }, { total: consultas.length });

  } catch (err) {
    console.error('Consultas error:', err);
    return serverError();
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validation = createConsultaSchema.safeParse(body);
    if (!validation.success) {
      return error(validation.error.issues[0]?.message || 'Datos inválidos');
    }

    const { userId = 'demo-user', serviceId, type, query } = validation.data;

    // Validate service
    const service = getService(serviceId);
    if (!service) {
      return error('Servicio no encontrado');
    }

    const consulta = createConsulta(userId, serviceId, type, query);

    const typeLabels: Record<string, string> = {
      certificate: 'Certificado',
      status: 'Estado',
      debt: 'Deudas',
      history: 'Historial',
    };

    return success({
      message: `Consulta de ${typeLabels[type]} iniciada`,
      consulta,
      service: { id: service.id, name: service.shortName, icon: service.icon },
      note: 'La consulta está siendo procesada. Actualice para ver el resultado.',
    });

  } catch (err) {
    console.error('Create consulta error:', err);
    return serverError();
  }
}
