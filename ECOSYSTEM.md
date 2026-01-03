# NewCool Ecosystem v2.0

> Plataforma educativa integral para Chile y Latinoamérica

## Vision

NewCool transforma la educación a través de tecnología, música y gamificación, haciendo el aprendizaje accesible, entretenido y efectivo para todos.

---

## Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                        NEWCOOL ECOSYSTEM                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Frontend   │  │   SDK v2.0   │  │   MCP v2.0   │          │
│  │  (Apps/Web)  │  │  (8 clients) │  │  (32 tools)  │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                 │                 │                   │
│         └─────────────────┼─────────────────┘                   │
│                           │                                     │
│                           ▼                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    NEWCOOL API v2.0                      │   │
│  │                   (Next.js 15 + TypeScript)              │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │                                                          │   │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐       │   │
│  │  │  Auth   │ │ Search  │ │  Music  │ │Education│       │   │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘       │   │
│  │                                                          │   │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐       │   │
│  │  │   Gov   │ │ Mind OS │ │ Notifs  │ │Analytics│       │   │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘       │   │
│  │                                                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Módulos

### 1. Authentication (`/api/auth`)
- Registro y login de usuarios
- Gestión de sesiones JWT
- Perfiles de usuario

### 2. Search V3 (`/api/search`)
- Búsqueda unificada en todo el ecosistema
- Filtros por tipo, materia, género
- Indexación en tiempo real

### 3. Music - TuneStream (`/api/music`)
- 25 tracks educativos
- 6 álbumes por materia
- 4 playlists curadas
- 5 géneros: reggaeton, trap, cumbia, rock, pop
- Streaming y tracking de reproducciones

### 4. Education (`/api/courses`)
- 11 cursos en 7 materias
- Sistema de lecciones progresivas
- Quizzes con evaluación automática
- Certificados de finalización
- Tracking de progreso

### 5. Government - Portal Ciudadano (`/api/gov`)
- 12 servicios públicos chilenos
- 15 trámites con requisitos y pasos
- Sistema de citas online
- Consultas de certificados y deudas

**Servicios incluidos:**
- FONASA, SII, Registro Civil
- AFP, IPS, MINVU
- ChileAtiende, Comisaría Virtual
- SERNAC, Dirección del Trabajo
- JUNAEB, SernamEG

### 6. Mind OS (`/api/mind-os`)
- 10 modos cognitivos
- 5 categorías: focus, creative, learning, wellness, productivity
- Sesiones guiadas con técnicas
- Perfil de usuario con achievements

### 7. Notifications (`/api/notifications`)
- 6 tipos de notificaciones
- Preferencias por usuario
- Quiet hours configurable

### 8. Webhooks (`/api/webhooks`)
- 14 eventos disponibles
- Integración con servicios externos
- Historial de entregas

### 9. Analytics (`/api/analytics`)
- Stats de plataforma
- Dashboard admin
- Métricas por período
- Funnels de conversión
- Event tracking

---

## Repositorios

| Repositorio | Descripción | Tech Stack |
|-------------|-------------|------------|
| **newcool-api** | Backend API | Next.js 15, TypeScript, Zod |
| **newcool-sdk** | SDK oficial | TypeScript, tsup |
| **newcool-mcp** | MCP Server | Node.js, JSON-RPC |

---

## SDK v2.0

```typescript
import { NewCoolClient } from '@newcool/sdk';

const client = new NewCoolClient({
  apiUrl: 'https://api.newcool.io',
  apiKey: 'your-api-key'
});

// 8 clientes disponibles
client.auth          // Autenticación
client.search        // Búsqueda unificada
client.music         // Streaming musical
client.education     // Cursos y quizzes
client.gov           // Servicios gobierno
client.mindOs        // Modos cognitivos
client.notifications // Notificaciones
client.analytics     // Métricas
```

---

## MCP Server v2.0

32 herramientas para Claude Code y otros clientes MCP:

| Categoría | Herramientas |
|-----------|--------------|
| Search | `search`, `search_music` |
| Music | `get_music_catalog`, `get_track`, `get_genres` |
| Education | `list_courses`, `get_course`, `get_lesson`, `get_quiz`, `submit_quiz`, `get_learning_progress`, `enroll_course` |
| Government | `list_gov_services`, `get_gov_service`, `list_tramites`, `get_tramite`, `schedule_cita`, `get_user_citas`, `create_consulta` |
| Modules | `list_modules`, `get_module`, `check_module_access` |
| Mind OS | `list_cognitive_modes`, `get_cognitive_mode`, `start_mind_session`, `end_mind_session`, `get_mind_profile` |
| Notifications | `get_notifications`, `mark_notification_read` |

---

## Estadísticas

| Métrica | Valor |
|---------|-------|
| Endpoints API | 45+ |
| Módulos | 8 |
| Tools MCP | 32 |
| SDK Clients | 8 |
| Tipos TypeScript | 25+ |
| Líneas de código | 8,000+ |
| Servicios gobierno | 12 |
| Trámites | 15 |
| Cursos | 11 |
| Tracks musicales | 25 |
| Modos cognitivos | 10 |

---

## Deployment

### Variables de Entorno

```env
# API
NEWCOOL_API_URL=https://api.newcool.io
DATABASE_URL=postgresql://...
JWT_SECRET=...

# Supabase (opcional)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

# Analytics (opcional)
ANALYTICS_API_KEY=...
```

### URLs de Producción

| Servicio | URL |
|----------|-----|
| API | https://api.newcool.io |
| Docs | https://docs.newcool.io |
| Status | https://status.newcool.io |
| Dashboard | https://admin.newcool.io |

---

## Roadmap

### Completado (v2.0)
- [x] API Core (Auth, Search)
- [x] Music Streaming
- [x] Education Platform
- [x] Government Services
- [x] Mind OS
- [x] Notifications & Webhooks
- [x] Analytics Dashboard
- [x] SDK v2.0
- [x] MCP Server v2.0

### Próximos Pasos (v2.1+)
- [ ] Mobile Apps (Flutter)
- [ ] Atlas Browser integration
- [ ] AI Tutor personalizado
- [ ] Gamification system
- [ ] Social features
- [ ] Premium subscriptions
- [ ] Multi-language support

---

## Equipo

**NewCool** - Transformando la educación en Chile

---

*Versión 2.0.0 - Enero 2026*
