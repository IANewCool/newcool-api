# NewCool API Documentation

Base URL: `https://api.newcool.io` (Production) | `http://localhost:3000` (Development)

---

## Health Check

### GET /api/health

Check API status.

**Response:**
```json
{
  "status": "healthy",
  "service": "newcool-api",
  "version": "1.0.0",
  "uptime": "3600s",
  "timestamp": "2026-01-03T12:00:00.000Z"
}
```

---

## Authentication

### POST /api/auth/signup

Create a new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "username": "newuser",
  "country_code": "CL"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "username": "newuser"
    },
    "message": "Usuario creado exitosamente"
  }
}
```

### POST /api/auth/login

Authenticate user.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": { "id": "uuid", "email": "user@example.com" },
    "session": {
      "access_token": "eyJ...",
      "refresh_token": "eyJ...",
      "expires_at": 1704326400
    }
  }
}
```

### POST /api/auth/logout

End session. No body required.

### GET /api/auth/me

Get current user profile. Requires `Authorization: Bearer <token>`.

### PATCH /api/auth/me

Update current user profile.

**Request:**
```json
{
  "display_name": "New Name",
  "preferences": {
    "theme": "dark",
    "notifications": true
  }
}
```

---

## Search

### GET /api/search

Unified search across music, courses, and modules.

**Parameters:**
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| q | string | Yes | Search query |
| type | string | No | `all`, `music`, `courses`, `modules` |
| subject | string | No | Filter by subject |
| grade | string | No | Filter by grade level |
| genre | string | No | Filter music by genre |
| limit | number | No | Results per page (1-100, default 20) |
| offset | number | No | Pagination offset |

**Example:**
```
GET /api/search?q=tablas&type=music&genre=reggaeton&limit=10
```

**Response:**
```json
{
  "success": true,
  "data": {
    "query": "tablas",
    "filters": { "type": "music", "genre": "reggaeton" },
    "results": [
      {
        "id": "1",
        "type": "music",
        "title": "Tablas del Reggaetón - Tabla del 2",
        "artist": "NewCool Edu",
        "genre": "reggaeton",
        "subject": "math",
        "score": 15
      }
    ]
  },
  "meta": { "total": 4, "limit": 10, "offset": 0 }
}
```

### GET /api/search?stats=true

Get search index statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "music": { "total": 15, "indexed": 15 },
    "courses": { "total": 12, "indexed": 12 },
    "modules": { "total": 10, "indexed": 10 },
    "lastUpdated": "2026-01-03T12:00:00.000Z"
  }
}
```

---

## Music

### GET /api/music

Get music catalog.

**Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| genre | string | Filter by genre |
| artist | string | Filter by artist |
| limit | number | Results per page |
| offset | number | Pagination offset |

**Response:**
```json
{
  "success": true,
  "data": {
    "tracks": [
      {
        "id": "1",
        "title": "Tablas del Reggaetón - Tabla del 2",
        "artist": "NewCool Edu",
        "album": "Matemáticas Bailables",
        "genre": "reggaeton",
        "duration": 180,
        "url": "https://cdn.newcool.io/music/tablas-2.mp3"
      }
    ],
    "genres": ["reggaeton", "trap", "cumbia", "rock", "pop"]
  },
  "meta": { "total": 15, "limit": 20, "offset": 0 }
}
```

### GET /api/music/:id

Get track details with lyrics.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "t001",
    "title": "Tabla del 2",
    "artist": "NewCool Edu",
    "album": "Tablas del Reggaetón",
    "genre": "reggaeton",
    "subject": "math",
    "grade": "1-3",
    "duration": 180,
    "url": "https://cdn.newcool.io/music/tabla-2.mp3",
    "coverUrl": "https://cdn.newcool.io/covers/tablas-reggaeton.jpg",
    "plays": 45230,
    "likes": 3200
  }
}
```

### POST /api/music/:id

Increment play count for a track.

**Request:**
```json
{
  "action": "play"
}
```

**Response:**
```json
{
  "success": true,
  "data": { "plays": 45231 }
}
```

### GET /api/music?stats=true

Get music catalog statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalTracks": 25,
    "totalAlbums": 6,
    "totalPlaylists": 4,
    "totalPlays": 623800,
    "totalLikes": 48900,
    "genres": ["reggaeton", "trap", "cumbia", "rock", "pop"],
    "subjects": ["math", "chemistry", "geography", "spanish", "history", "english"]
  }
}
```

---

## Albums

### GET /api/music/albums

List all albums.

**Response:**
```json
{
  "success": true,
  "data": {
    "albums": [
      {
        "id": "a001",
        "title": "Tablas del Reggaetón",
        "artist": "NewCool Edu",
        "genre": "reggaeton",
        "subject": "math",
        "coverUrl": "https://cdn.newcool.io/covers/tablas-reggaeton.jpg",
        "trackCount": 9,
        "releaseDate": "2025-06-01"
      }
    ]
  },
  "meta": { "total": 6 }
}
```

### GET /api/music/albums/:id

Get album details with tracks.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "a001",
    "title": "Tablas del Reggaetón",
    "artist": "NewCool Edu",
    "tracks": [{ "id": "t001", "title": "Tabla del 2", ... }]
  }
}
```

---

## Playlists

### GET /api/music/playlists

List public playlists.

**Response:**
```json
{
  "success": true,
  "data": {
    "playlists": [
      {
        "id": "p001",
        "name": "Top Educativo",
        "description": "Las canciones más escuchadas",
        "coverUrl": "https://cdn.newcool.io/playlists/top-educativo.jpg",
        "trackCount": 5
      }
    ]
  },
  "meta": { "total": 4 }
}
```

### GET /api/music/playlists/:id

Get playlist details with tracks.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "p001",
    "name": "Top Educativo",
    "description": "Las canciones más escuchadas",
    "tracks": [{ "id": "t001", "title": "Tabla del 2", ... }]
  }
}
```

---

## Mind OS (Premium)

### GET /api/mind-os

Get Mind OS overview and available endpoints.

### GET /api/mind-os/modes

List cognitive modes.

**Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| category | string | Filter: focus, creative, learning, wellness, productivity |
| tier | string | Filter: free or premium |

**Response:**
```json
{
  "success": true,
  "data": {
    "modes": [
      {
        "id": "deep-focus",
        "name": "Deep Focus",
        "description": "Eliminate distractions and enter deep concentration",
        "icon": "🎯",
        "color": "#3b82f6",
        "category": "focus",
        "duration": 45,
        "isPremium": false,
        "techniques": ["Pomodoro intervals", "Ambient sounds"]
      }
    ],
    "stats": { "total": 10, "free": 6, "premium": 4 }
  }
}
```

### GET /api/mind-os/modes/:id

Get mode details with session guide.

### GET /api/mind-os/profile

Get user profile with stats and achievements.

**Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| userId | string | User ID (defaults to demo-user) |

**Response:**
```json
{
  "success": true,
  "data": {
    "userId": "demo-user",
    "level": 3,
    "totalSessions": 25,
    "totalMinutes": 180,
    "focusScore": 75,
    "creativityScore": 60,
    "streak": 5,
    "preferredModes": ["deep-focus", "rapid-learn"]
  }
}
```

### PATCH /api/mind-os/profile

Update user preferences.

### POST /api/mind-os/sessions

Start or end a session.

**Start Session:**
```json
{
  "modeId": "deep-focus",
  "userId": "user-123"
}
```

**End Session:**
```json
{
  "action": "end",
  "sessionId": "sess_1234567890",
  "rating": 5,
  "notes": "Great session!"
}
```

---

## Education

### GET /api/courses

List available courses.

**Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| subject | string | Filter by subject (math, science, language, etc.) |
| level | string | Filter by level (primaria, secundaria, preuniversitario) |
| limit | number | Results per page |

**Response:**
```json
{
  "success": true,
  "data": {
    "courses": [
      {
        "id": "math-101",
        "title": "Matemáticas Fundamentales",
        "subject": "math",
        "level": "primaria",
        "description": "Operaciones básicas y resolución de problemas",
        "lessonCount": 16
      }
    ]
  },
  "meta": { "total": 11 }
}
```

### GET /api/courses/:id

Get course details with lessons.

### POST /api/quizzes/:quizId/submit

Submit quiz answers.

**Request:**
```json
{
  "answers": { "q1": 2, "q2": 1 },
  "userId": "user-123"
}
```

---

## Government Services (Portal Ciudadano)

### GET /api/gov

Get government portal overview.

**Response:**
```json
{
  "success": true,
  "data": {
    "portal": "Portal Ciudadano NewCool",
    "description": "Acceso unificado a servicios públicos de Chile",
    "stats": {
      "totalServices": 12,
      "totalTramites": 15,
      "onlineServices": 10
    }
  }
}
```

### GET /api/gov/services

List public services.

**Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| category | string | Filter: salud, impuestos, identidad, trabajo, etc. |
| online | boolean | Filter by online availability |

**Response:**
```json
{
  "success": true,
  "data": {
    "services": [
      {
        "id": "fonasa",
        "name": "Fondo Nacional de Salud",
        "shortName": "FONASA",
        "category": "salud",
        "icon": "🏥",
        "isOnline": true,
        "tramites": ["tr-fonasa-afiliacion", "tr-fonasa-bonos"]
      }
    ]
  },
  "meta": { "total": 12 }
}
```

### GET /api/gov/services/:id

Get service details with available procedures.

### GET /api/gov/tramites

List government procedures.

**Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| serviceId | string | Filter by service |
| online | boolean | Filter online-only |
| free | boolean | Filter free procedures |

### GET /api/gov/tramites/:id

Get procedure details with requirements and steps.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "tr-registro-civil-cedula",
    "name": "Obtener Cédula de Identidad",
    "description": "Solicitud de cédula de identidad para chilenos",
    "requirements": ["Certificado de nacimiento", "2 fotos carnet"],
    "steps": ["Agendar cita", "Presentarse en oficina", "Pagar arancel"],
    "duration": "10 días hábiles",
    "cost": 5100,
    "isOnline": false
  }
}
```

### POST /api/gov/citas

Schedule or update appointment.

**Schedule Request:**
```json
{
  "serviceId": "registro-civil",
  "tramiteId": "tr-registro-civil-cedula",
  "date": "2026-01-15",
  "time": "10:30",
  "location": "Oficina Santiago Centro"
}
```

**Update Request:**
```json
{
  "citaId": "cita_123",
  "action": "confirm"
}
```

### GET /api/gov/citas

Get user appointments.

**Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| userId | string | User ID |
| id | string | Get specific appointment |

### POST /api/gov/consultas

Create online query (certificates, status, debts).

**Request:**
```json
{
  "serviceId": "sii",
  "type": "certificate",
  "query": { "year": "2025", "docType": "renta" }
}
```

### GET /api/gov/consultas

Get user queries.

---

## Notifications

### GET /api/notifications

Get user notifications.

**Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| userId | string | User ID |
| unread | boolean | Only unread notifications |
| type | string | Filter: course, cita, achievement, quiz, system, reminder |
| limit | number | Results per page |

**Response:**
```json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "id": "notif_123",
        "type": "course",
        "title": "Curso Completado",
        "message": "Has completado Matemáticas Fundamentales",
        "icon": "📚",
        "read": false,
        "createdAt": "2026-01-03T12:00:00Z"
      }
    ],
    "unreadCount": 3
  }
}
```

### POST /api/notifications

Create notification or mark all as read.

**Mark All Read:**
```json
{ "action": "markAllRead", "userId": "user-123" }
```

### PATCH /api/notifications/:id

Mark single notification as read.

```json
{ "action": "read" }
```

### DELETE /api/notifications/:id

Delete a notification.

---

## Webhooks

### GET /api/webhooks

List user webhooks.

**Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| userId | string | User ID |
| events | boolean | List available events |

### GET /api/webhooks?events=true

List all available webhook events.

**Response:**
```json
{
  "success": true,
  "data": {
    "events": [
      { "event": "course.enrolled", "description": "Inscripción a curso" },
      { "event": "course.completed", "description": "Curso completado" },
      { "event": "cita.scheduled", "description": "Cita agendada" },
      { "event": "quiz.submitted", "description": "Quiz enviado" }
    ]
  }
}
```

### POST /api/webhooks

Create a new webhook.

**Request:**
```json
{
  "url": "https://your-server.com/webhook",
  "events": ["course.enrolled", "course.completed", "quiz.submitted"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "webhook": {
      "id": "wh_123",
      "url": "https://your-server.com/webhook",
      "events": ["course.enrolled", "course.completed"],
      "secret": "whsec_abc123...",
      "active": true
    }
  }
}
```

### PATCH /api/webhooks/:id

Update webhook or regenerate secret.

**Regenerate Secret:**
```json
{ "action": "regenerateSecret" }
```

### DELETE /api/webhooks/:id

Delete a webhook.

---

## Analytics

### GET /api/analytics?view=platform

Get platform-wide statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "type": "platform",
    "stats": {
      "users": { "total": 15420, "active": 8750, "newThisWeek": 342 },
      "courses": { "total": 11, "enrollments": 28450, "completions": 12380 },
      "music": { "totalTracks": 25, "totalPlays": 623800 },
      "government": { "totalServices": 12, "citasScheduled": 4520 },
      "mindOs": { "totalSessions": 45200, "totalMinutes": 892000 }
    }
  }
}
```

### GET /api/analytics?view=dashboard

Get admin dashboard data with charts and top content.

### GET /api/analytics?view=user&userId=xxx

Get user-specific analytics.

### GET /api/analytics?view=metrics&metric=xxx&period=xxx

Get time-series metrics.

**Metrics:** users, enrollments, plays, sessions, citas
**Periods:** day, week, month, year

**Response:**
```json
{
  "success": true,
  "data": {
    "metric": "enrollments",
    "period": "week",
    "current": 856,
    "previous": 742,
    "change": 15.4,
    "data": [
      { "date": "2026-01-01", "value": 120 },
      { "date": "2026-01-02", "value": 135 }
    ]
  }
}
```

### GET /api/analytics?view=funnel&funnel=xxx

Get conversion funnel data.

**Funnels:** onboarding, course, purchase

### POST /api/analytics

Track custom event.

**Request:**
```json
{
  "event": "button_click",
  "properties": { "button": "enroll", "courseId": "math-101" },
  "userId": "user-123"
}
```

---

## Users

### GET /api/users

List users (public profiles only).

**Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| username | string | Search by username |
| limit | number | Results per page |
| offset | number | Pagination offset |

### GET /api/users/:id

Get user public profile.

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": "Error message"
}
```

**Status Codes:**
| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Server Error |

---

## Rate Limits

| Endpoint | Limit |
|----------|-------|
| /api/auth/* | 10 req/min |
| /api/search | 100 req/min |
| /api/music | 200 req/min |
| Other | 60 req/min |

---

## SDKs

### JavaScript/TypeScript

```bash
npm install @newcool/sdk
```

```typescript
import { NewCoolClient } from '@newcool/sdk';

const client = new NewCoolClient({
  apiUrl: 'https://api.newcool.io',
  apiKey: 'your-api-key'
});

// Search
const results = await client.search.search('tablas', { type: 'music' });

// Music
const tracks = await client.music.getTracks({ genre: 'reggaeton' });
await client.music.play('t001');

// Education
const courses = await client.education.getCourses({ subject: 'math' });
await client.education.enroll('math-101');
const result = await client.education.submitQuiz('quiz-1', { q1: 1, q2: 2 });

// Government
const services = await client.gov.getServices({ category: 'salud' });
await client.gov.scheduleCita({
  serviceId: 'registro-civil',
  tramiteId: 'tr-cedula',
  date: '2026-01-15',
  time: '10:30',
  location: 'Santiago Centro'
});

// Mind OS
const modes = await client.mindOs.getModes({ tier: 'free' });
const session = await client.mindOs.startSession('deep-focus');
await client.mindOs.endSession(session.data.session.id, 5, 'Great!');

// Notifications
const notifs = await client.notifications.getAll({ unreadOnly: true });
await client.notifications.markAsRead('notif_123');

// Analytics
const stats = await client.analytics.getPlatformStats();
await client.analytics.trackEvent('page_view', { page: '/courses' });
```

---

*NewCool API v2.0.0 - Enero 2026*
