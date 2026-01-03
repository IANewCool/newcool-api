import { success, error, serverError } from '@/lib/api-response';
import { publicServices, getServicesByCategory, getServiceTramites } from '@/lib/government';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const online = searchParams.get('online');

    let results = [...publicServices];

    // Filter by category
    if (category) {
      const validCategories = ['salud', 'impuestos', 'identidad', 'trabajo', 'previsión', 'vivienda', 'educación', 'justicia', 'transporte'];
      if (!validCategories.includes(category)) {
        return error(`Categoría inválida. Debe ser: ${validCategories.join(', ')}`);
      }
      results = getServicesByCategory(category as typeof publicServices[0]['category']);
    }

    // Filter by online availability
    if (online === 'true') {
      results = results.filter(s => s.isOnline);
    }

    // Enrich with tramite count
    const enriched = results.map(service => ({
      ...service,
      tramiteCount: getServiceTramites(service.id).length,
    }));

    return success({
      services: enriched,
      categories: [...new Set(publicServices.map(s => s.category))],
    }, { total: results.length });

  } catch (err) {
    console.error('Services error:', err);
    return serverError();
  }
}
