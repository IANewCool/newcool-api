import { success, error, notFound, serverError } from '@/lib/api-response';
import { createCita, getUserCitas, getCita, updateCitaStatus, getService, getTramite } from '@/lib/government';
import { z } from 'zod';

const createCitaSchema = z.object({
  userId: z.string().optional(),
  serviceId: z.string(),
  tramiteId: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  location: z.string().min(1),
});

const updateCitaSchema = z.object({
  citaId: z.string(),
  action: z.enum(['confirm', 'cancel']),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'demo-user';
    const citaId = searchParams.get('id');

    // Get specific cita
    if (citaId) {
      const cita = getCita(citaId);
      if (!cita) {
        return notFound('Cita no encontrada');
      }
      const service = getService(cita.serviceId);
      const tramite = getTramite(cita.tramiteId);
      return success({
        ...cita,
        service: service ? { id: service.id, name: service.shortName, icon: service.icon } : null,
        tramite: tramite ? { id: tramite.id, name: tramite.name } : null,
      });
    }

    // Get all user citas
    const citas = getUserCitas(userId);

    // Enrich with service/tramite info
    const enriched = citas.map(cita => {
      const service = getService(cita.serviceId);
      const tramite = getTramite(cita.tramiteId);
      return {
        ...cita,
        service: service ? { id: service.id, name: service.shortName, icon: service.icon } : null,
        tramite: tramite ? { id: tramite.id, name: tramite.name } : null,
      };
    });

    // Sort by date
    enriched.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return success({
      userId,
      citas: enriched,
    }, { total: citas.length });

  } catch (err) {
    console.error('Citas error:', err);
    return serverError();
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Handle update action
    if (body.action) {
      const validation = updateCitaSchema.safeParse(body);
      if (!validation.success) {
        return error(validation.error.issues[0]?.message || 'Datos inválidos');
      }

      const { citaId, action } = validation.data;
      const status = action === 'confirm' ? 'confirmed' : 'cancelled';
      const cita = updateCitaStatus(citaId, status);

      if (!cita) {
        return notFound('Cita no encontrada');
      }

      return success({
        message: action === 'confirm' ? 'Cita confirmada' : 'Cita cancelada',
        cita,
      });
    }

    // Create new cita
    const validation = createCitaSchema.safeParse(body);
    if (!validation.success) {
      return error(validation.error.issues[0]?.message || 'Datos inválidos');
    }

    const { userId = 'demo-user', serviceId, tramiteId, date, time, location } = validation.data;

    // Validate service and tramite
    const service = getService(serviceId);
    if (!service) {
      return error('Servicio no encontrado');
    }

    const tramite = getTramite(tramiteId);
    if (!tramite) {
      return error('Trámite no encontrado');
    }

    // Validate date is in the future
    const citaDate = new Date(`${date}T${time}`);
    if (citaDate <= new Date()) {
      return error('La fecha debe ser en el futuro');
    }

    const cita = createCita(userId, serviceId, tramiteId, date, time, location);

    return success({
      message: 'Cita agendada exitosamente',
      cita,
      service: { id: service.id, name: service.shortName },
      tramite: { id: tramite.id, name: tramite.name },
      instructions: [
        `Código de confirmación: ${cita.confirmationCode}`,
        `Fecha: ${date} a las ${time}`,
        `Ubicación: ${location}`,
        'Recuerde llevar su cédula de identidad',
      ],
    });

  } catch (err) {
    console.error('Create cita error:', err);
    return serverError();
  }
}
