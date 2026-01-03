import { success, serverError } from '@/lib/api-response';
import { publicServices, getGovStats } from '@/lib/government';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Stats endpoint
    if (searchParams.get('stats') === 'true') {
      return success(getGovStats());
    }

    // Return overview
    return success({
      name: 'Portal Ciudadano NewCool',
      description: 'Acceso unificado a servicios públicos de Chile',
      version: '1.0.0',
      features: [
        'Consulta de servicios públicos',
        'Información de trámites',
        'Agendamiento de citas',
        'Consultas en línea',
        'Historial de trámites',
      ],
      totalServices: publicServices.length,
      categories: [
        { id: 'salud', name: 'Salud', icon: '🏥' },
        { id: 'impuestos', name: 'Impuestos', icon: '📊' },
        { id: 'identidad', name: 'Identidad', icon: '🪪' },
        { id: 'trabajo', name: 'Trabajo', icon: '👷' },
        { id: 'previsión', name: 'Previsión', icon: '🏦' },
        { id: 'vivienda', name: 'Vivienda', icon: '🏠' },
        { id: 'educación', name: 'Educación', icon: '🎓' },
        { id: 'justicia', name: 'Justicia', icon: '⚖️' },
        { id: 'transporte', name: 'Transporte', icon: '🚗' },
      ],
      endpoints: {
        services: '/api/gov/services',
        tramites: '/api/gov/tramites',
        citas: '/api/gov/citas',
        consultas: '/api/gov/consultas',
      },
    });

  } catch (err) {
    console.error('Gov portal error:', err);
    return serverError();
  }
}
