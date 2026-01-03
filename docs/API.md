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
    "id": "1",
    "title": "Tablas del Reggaetón - Tabla del 2",
    "artist": "NewCool Edu",
    "lyrics": "[Coro]\nDos por uno, dos...",
    "duration": 180,
    "url": "https://cdn.newcool.io/music/tablas-2.mp3"
  }
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

```typescript
import { NewCoolClient } from '@newcool/sdk';

const client = new NewCoolClient({
  apiUrl: 'https://api.newcool.io',
  apiKey: 'your-api-key'
});

// Search
const results = await client.search('tablas', { type: 'music' });

// Get track
const track = await client.music.getTrack('1');
```

---

*NewCool API v1.0.0 - Enero 2026*
