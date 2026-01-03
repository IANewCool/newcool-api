/**
 * NewCool Government Services
 * Portal ciudadano para servicios públicos de Chile
 */

export interface PublicService {
  id: string;
  name: string;
  shortName: string;
  description: string;
  category: 'salud' | 'impuestos' | 'identidad' | 'trabajo' | 'previsión' | 'vivienda' | 'educación' | 'justicia' | 'transporte';
  icon: string;
  color: string;
  website: string;
  phone?: string;
  tramites: string[];
  isOnline: boolean;
}

export interface Tramite {
  id: string;
  serviceId: string;
  name: string;
  description: string;
  requirements: string[];
  steps: string[];
  duration: string;
  cost: number | 'gratis' | 'variable';
  isOnline: boolean;
  url?: string;
  documents?: string[];
}

export interface Cita {
  id: string;
  userId: string;
  serviceId: string;
  tramiteId: string;
  date: string;
  time: string;
  location: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  confirmationCode: string;
  notes?: string;
  createdAt: string;
}

export interface Consulta {
  id: string;
  userId: string;
  serviceId: string;
  type: 'certificate' | 'status' | 'debt' | 'history';
  query: Record<string, string>;
  result?: Record<string, unknown>;
  status: 'pending' | 'completed' | 'error';
  createdAt: string;
}

// Public Services Catalog
export const publicServices: PublicService[] = [
  // Salud
  {
    id: 'fonasa',
    name: 'Fondo Nacional de Salud',
    shortName: 'FONASA',
    description: 'Seguro público de salud para todos los chilenos',
    category: 'salud',
    icon: '🏥',
    color: '#16a34a',
    website: 'https://www.fonasa.cl',
    phone: '600 360 3000',
    tramites: ['tr-fonasa-credencial', 'tr-fonasa-bonos', 'tr-fonasa-licencia'],
    isOnline: true,
  },
  {
    id: 'minsal',
    name: 'Ministerio de Salud',
    shortName: 'MINSAL',
    description: 'Autoridad sanitaria y políticas de salud pública',
    category: 'salud',
    icon: '⚕️',
    color: '#059669',
    website: 'https://www.minsal.cl',
    phone: '600 360 7777',
    tramites: ['tr-minsal-vacunas', 'tr-minsal-pase'],
    isOnline: true,
  },

  // Impuestos
  {
    id: 'sii',
    name: 'Servicio de Impuestos Internos',
    shortName: 'SII',
    description: 'Administración tributaria y fiscalización de impuestos',
    category: 'impuestos',
    icon: '📊',
    color: '#2563eb',
    website: 'https://www.sii.cl',
    phone: '22 395 1115',
    tramites: ['tr-sii-renta', 'tr-sii-boleta', 'tr-sii-rut', 'tr-sii-situacion'],
    isOnline: true,
  },
  {
    id: 'tgr',
    name: 'Tesorería General de la República',
    shortName: 'TGR',
    description: 'Recaudación y pago de obligaciones fiscales',
    category: 'impuestos',
    icon: '💰',
    color: '#1d4ed8',
    website: 'https://www.tgr.cl',
    phone: '600 400 0444',
    tramites: ['tr-tgr-deudas', 'tr-tgr-pagos', 'tr-tgr-certificados'],
    isOnline: true,
  },

  // Identidad
  {
    id: 'registro-civil',
    name: 'Servicio de Registro Civil e Identificación',
    shortName: 'Registro Civil',
    description: 'Identidad, estado civil y documentos oficiales',
    category: 'identidad',
    icon: '🪪',
    color: '#7c3aed',
    website: 'https://www.registrocivil.cl',
    phone: '600 370 2000',
    tramites: ['tr-rc-cedula', 'tr-rc-pasaporte', 'tr-rc-certificados', 'tr-rc-antecedentes'],
    isOnline: true,
  },

  // Trabajo
  {
    id: 'dt',
    name: 'Dirección del Trabajo',
    shortName: 'DT',
    description: 'Fiscalización laboral y derechos de trabajadores',
    category: 'trabajo',
    icon: '👷',
    color: '#ea580c',
    website: 'https://www.dt.gob.cl',
    phone: '600 450 4000',
    tramites: ['tr-dt-denuncia', 'tr-dt-finiquito', 'tr-dt-consulta'],
    isOnline: true,
  },

  // Previsión
  {
    id: 'afp',
    name: 'Superintendencia de Pensiones',
    shortName: 'SP',
    description: 'Supervisión del sistema de pensiones',
    category: 'previsión',
    icon: '🏦',
    color: '#0891b2',
    website: 'https://www.spensiones.cl',
    phone: '600 460 6000',
    tramites: ['tr-afp-consulta', 'tr-afp-retiro', 'tr-afp-bono'],
    isOnline: true,
  },
  {
    id: 'ips',
    name: 'Instituto de Previsión Social',
    shortName: 'IPS',
    description: 'Pensiones y beneficios sociales del Estado',
    category: 'previsión',
    icon: '👴',
    color: '#0d9488',
    website: 'https://www.ips.gob.cl',
    phone: '600 440 0040',
    tramites: ['tr-ips-pension', 'tr-ips-bono', 'tr-ips-certificado'],
    isOnline: true,
  },

  // Vivienda
  {
    id: 'minvu',
    name: 'Ministerio de Vivienda y Urbanismo',
    shortName: 'MINVU',
    description: 'Políticas habitacionales y subsidios de vivienda',
    category: 'vivienda',
    icon: '🏠',
    color: '#ca8a04',
    website: 'https://www.minvu.cl',
    phone: '600 818 6886',
    tramites: ['tr-minvu-subsidio', 'tr-minvu-postulacion', 'tr-minvu-rsh'],
    isOnline: true,
  },

  // Educación
  {
    id: 'mineduc',
    name: 'Ministerio de Educación',
    shortName: 'MINEDUC',
    description: 'Sistema educacional y becas estudiantiles',
    category: 'educación',
    icon: '🎓',
    color: '#7c3aed',
    website: 'https://www.mineduc.cl',
    phone: '600 600 2626',
    tramites: ['tr-mineduc-certificados', 'tr-mineduc-becas', 'tr-mineduc-gratuidad'],
    isOnline: true,
  },

  // Justicia
  {
    id: 'poder-judicial',
    name: 'Poder Judicial',
    shortName: 'PJUD',
    description: 'Administración de justicia y tribunales',
    category: 'justicia',
    icon: '⚖️',
    color: '#64748b',
    website: 'https://www.pjud.cl',
    phone: '600 326 0200',
    tramites: ['tr-pj-consulta', 'tr-pj-certificados'],
    isOnline: true,
  },

  // Transporte
  {
    id: 'registro-vehiculos',
    name: 'Registro de Vehículos Motorizados',
    shortName: 'RVM',
    description: 'Registro y transferencia de vehículos',
    category: 'transporte',
    icon: '🚗',
    color: '#dc2626',
    website: 'https://www.registrocivil.cl',
    phone: '600 370 2000',
    tramites: ['tr-rvm-transferencia', 'tr-rvm-certificado', 'tr-rvm-revision'],
    isOnline: true,
  },
];

// Tramites Catalog
export const tramites: Tramite[] = [
  // FONASA
  {
    id: 'tr-fonasa-credencial',
    serviceId: 'fonasa',
    name: 'Obtener Credencial FONASA',
    description: 'Solicitud de credencial de salud para atención en red pública',
    requirements: ['Cédula de identidad vigente', 'Estar afiliado a FONASA'],
    steps: ['Ingresar a Mi FONASA', 'Seleccionar "Credencial"', 'Verificar datos', 'Descargar o solicitar envío'],
    duration: 'Inmediato (digital) / 10 días (física)',
    cost: 'gratis',
    isOnline: true,
    url: 'https://www.fonasa.cl/sites/fonasa/credencial',
  },
  {
    id: 'tr-fonasa-bonos',
    serviceId: 'fonasa',
    name: 'Comprar Bonos de Atención',
    description: 'Adquisición de bonos para atención médica en red privada',
    requirements: ['Cédula de identidad', 'Estar afiliado a FONASA', 'Orden médica (si aplica)'],
    steps: ['Ingresar a Mi FONASA', 'Seleccionar "Bonos Web"', 'Buscar prestador', 'Pagar y descargar bono'],
    duration: 'Inmediato',
    cost: 'variable',
    isOnline: true,
    url: 'https://www.fonasa.cl/sites/fonasa/bonoweb',
  },

  // SII
  {
    id: 'tr-sii-renta',
    serviceId: 'sii',
    name: 'Declaración de Renta',
    description: 'Declaración anual de impuesto a la renta',
    requirements: ['RUT y clave tributaria', 'Información de ingresos del año'],
    steps: ['Ingresar a sii.cl', 'Ir a "Declaración de Renta"', 'Revisar propuesta', 'Confirmar o modificar', 'Enviar declaración'],
    duration: '15-30 minutos',
    cost: 'gratis',
    isOnline: true,
    url: 'https://www.sii.cl/renta',
  },
  {
    id: 'tr-sii-boleta',
    serviceId: 'sii',
    name: 'Emitir Boleta Electrónica',
    description: 'Emisión de boleta de honorarios electrónica',
    requirements: ['RUT y clave tributaria', 'Inicio de actividades vigente'],
    steps: ['Ingresar a sii.cl', 'Ir a "Boleta Honorarios"', 'Completar datos', 'Emitir boleta'],
    duration: '5 minutos',
    cost: 'gratis',
    isOnline: true,
    url: 'https://www.sii.cl/boleta_honorarios',
  },
  {
    id: 'tr-sii-situacion',
    serviceId: 'sii',
    name: 'Consultar Situación Tributaria',
    description: 'Verificar estado tributario y deudas',
    requirements: ['RUT y clave tributaria'],
    steps: ['Ingresar a sii.cl', 'Ir a "Mi SII"', 'Seleccionar "Situación Tributaria"'],
    duration: 'Inmediato',
    cost: 'gratis',
    isOnline: true,
  },

  // Registro Civil
  {
    id: 'tr-rc-cedula',
    serviceId: 'registro-civil',
    name: 'Renovar Cédula de Identidad',
    description: 'Renovación de cédula de identidad chilena',
    requirements: ['Cédula anterior (si la tiene)', 'Foto 4x4 reciente'],
    steps: ['Agendar hora en registrocivil.cl', 'Acudir a oficina', 'Toma de foto y huella', 'Pagar arancel', 'Retirar en 10 días'],
    duration: '10 días hábiles',
    cost: 5000,
    isOnline: false,
    documents: ['Cédula anterior'],
  },
  {
    id: 'tr-rc-pasaporte',
    serviceId: 'registro-civil',
    name: 'Obtener Pasaporte',
    description: 'Solicitud de pasaporte chileno',
    requirements: ['Cédula de identidad vigente', 'Foto 4x4 reciente'],
    steps: ['Agendar hora en registrocivil.cl', 'Acudir a oficina', 'Toma de datos biométricos', 'Pagar arancel', 'Retirar en 10 días'],
    duration: '10 días hábiles',
    cost: 67000,
    isOnline: false,
    documents: ['Cédula de identidad'],
  },
  {
    id: 'tr-rc-antecedentes',
    serviceId: 'registro-civil',
    name: 'Certificado de Antecedentes',
    description: 'Obtener certificado de antecedentes penales',
    requirements: ['Cédula de identidad', 'ClaveÚnica'],
    steps: ['Ingresar a registrocivil.cl', 'Autenticarse con ClaveÚnica', 'Solicitar certificado', 'Descargar PDF'],
    duration: 'Inmediato',
    cost: 'gratis',
    isOnline: true,
    url: 'https://www.registrocivil.cl/antecedentes',
  },

  // Dirección del Trabajo
  {
    id: 'tr-dt-finiquito',
    serviceId: 'dt',
    name: 'Validar Finiquito',
    description: 'Ratificación de finiquito laboral',
    requirements: ['Finiquito firmado', 'Cédula de identidad'],
    steps: ['Agendar hora', 'Ambas partes acuden a oficina', 'Presentar documentos', 'Ratificar ante ministro de fe'],
    duration: '30 minutos',
    cost: 'gratis',
    isOnline: false,
  },

  // MINVU
  {
    id: 'tr-minvu-subsidio',
    serviceId: 'minvu',
    name: 'Postular a Subsidio Habitacional',
    description: 'Postulación a programas de subsidio de vivienda',
    requirements: ['ClaveÚnica', 'Registro Social de Hogares', 'Ahorro mínimo según programa'],
    steps: ['Ingresar a minvu.cl', 'Revisar programas disponibles', 'Verificar requisitos', 'Completar postulación', 'Adjuntar documentos'],
    duration: 'Variable según programa',
    cost: 'gratis',
    isOnline: true,
    url: 'https://www.minvu.cl/subsidios',
  },

  // IPS
  {
    id: 'tr-ips-bono',
    serviceId: 'ips',
    name: 'Consultar Bonos Sociales',
    description: 'Verificar bonos del Estado disponibles',
    requirements: ['RUT', 'ClaveÚnica'],
    steps: ['Ingresar a chileatiende.cl', 'Autenticarse', 'Revisar "Mis Bonos"'],
    duration: 'Inmediato',
    cost: 'gratis',
    isOnline: true,
    url: 'https://www.chileatiende.cl',
  },
];

// In-memory storage
const citas: Map<string, Cita> = new Map();
const consultas: Map<string, Consulta> = new Map();

// Helper functions
export function getService(id: string): PublicService | undefined {
  return publicServices.find(s => s.id === id);
}

export function getServicesByCategory(category: PublicService['category']): PublicService[] {
  return publicServices.filter(s => s.category === category);
}

export function getTramite(id: string): Tramite | undefined {
  return tramites.find(t => t.id === id);
}

export function getServiceTramites(serviceId: string): Tramite[] {
  return tramites.filter(t => t.serviceId === serviceId);
}

export function createCita(
  userId: string,
  serviceId: string,
  tramiteId: string,
  date: string,
  time: string,
  location: string
): Cita {
  const cita: Cita = {
    id: `cita_${Date.now()}`,
    userId,
    serviceId,
    tramiteId,
    date,
    time,
    location,
    status: 'scheduled',
    confirmationCode: `NC-${Date.now().toString(36).toUpperCase()}`,
    createdAt: new Date().toISOString(),
  };
  citas.set(cita.id, cita);
  return cita;
}

export function getCita(id: string): Cita | undefined {
  return citas.get(id);
}

export function getUserCitas(userId: string): Cita[] {
  return Array.from(citas.values()).filter(c => c.userId === userId);
}

export function updateCitaStatus(id: string, status: Cita['status']): Cita | undefined {
  const cita = citas.get(id);
  if (cita) {
    cita.status = status;
    citas.set(id, cita);
  }
  return cita;
}

export function createConsulta(
  userId: string,
  serviceId: string,
  type: Consulta['type'],
  query: Record<string, string>
): Consulta {
  const consulta: Consulta = {
    id: `cons_${Date.now()}`,
    userId,
    serviceId,
    type,
    query,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  consultas.set(consulta.id, consulta);

  // Simulate async processing
  setTimeout(() => {
    const updated = consultas.get(consulta.id);
    if (updated) {
      updated.status = 'completed';
      updated.result = generateMockResult(type, query);
      consultas.set(consulta.id, updated);
    }
  }, 1000);

  return consulta;
}

export function getConsulta(id: string): Consulta | undefined {
  return consultas.get(id);
}

export function getUserConsultas(userId: string): Consulta[] {
  return Array.from(consultas.values()).filter(c => c.userId === userId);
}

function generateMockResult(type: Consulta['type'], query: Record<string, string>): Record<string, unknown> {
  switch (type) {
    case 'certificate':
      return {
        status: 'valid',
        issueDate: new Date().toISOString(),
        expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
        downloadUrl: `https://newcool.io/certificates/${query.rut || 'demo'}`,
      };
    case 'status':
      return {
        status: 'al_dia',
        lastUpdate: new Date().toISOString(),
        details: 'Sin observaciones',
      };
    case 'debt':
      return {
        hasDebt: false,
        amount: 0,
        details: [],
      };
    case 'history':
      return {
        records: [
          { date: '2025-06-01', action: 'Consulta realizada', status: 'completed' },
          { date: '2025-03-15', action: 'Trámite completado', status: 'completed' },
        ],
      };
    default:
      return { message: 'Consulta procesada' };
  }
}

export function getGovStats() {
  return {
    totalServices: publicServices.length,
    totalTramites: tramites.length,
    onlineServices: publicServices.filter(s => s.isOnline).length,
    onlineTramites: tramites.filter(t => t.isOnline).length,
    categories: [...new Set(publicServices.map(s => s.category))],
    totalCitas: citas.size,
    totalConsultas: consultas.size,
  };
}
