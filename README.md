# NewCool API

Backend API for the NewCool educational ecosystem. Built with Next.js 15 and TypeScript.

## Modules

| Module | Description | Endpoints |
|--------|-------------|-----------|
| **Auth** | User authentication | `/api/auth/*` |
| **Search** | Unified search | `/api/search` |
| **Music** | Educational music streaming | `/api/music/*` |
| **Education** | Courses, lessons, quizzes | `/api/courses/*` |
| **Government** | Chilean public services | `/api/gov/*` |
| **Mind OS** | Cognitive enhancement | `/api/mind-os/*` |
| **Notifications** | User notifications | `/api/notifications/*` |
| **Webhooks** | Event integrations | `/api/webhooks/*` |
| **Analytics** | Platform metrics | `/api/analytics` |

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## API Endpoints

### Core
- `GET /api/health` - Health check
- `GET /api/status` - Ecosystem status

### Authentication
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Music
- `GET /api/music` - List tracks
- `GET /api/music/:id` - Track details
- `GET /api/music/albums` - List albums
- `GET /api/music/playlists` - List playlists

### Education
- `GET /api/courses` - List courses
- `GET /api/courses/:id` - Course details
- `POST /api/courses/enroll` - Enroll in course
- `GET /api/quizzes/:id` - Get quiz
- `POST /api/quizzes/:id/submit` - Submit quiz

### Government Services
- `GET /api/gov/services` - List services
- `GET /api/gov/tramites` - List procedures
- `POST /api/gov/citas` - Schedule appointment
- `POST /api/gov/consultas` - Create query

### Mind OS
- `GET /api/mind-os/modes` - List cognitive modes
- `POST /api/mind-os/sessions` - Start/end session
- `GET /api/mind-os/profile` - User profile

### Notifications & Webhooks
- `GET /api/notifications` - List notifications
- `POST /api/webhooks` - Create webhook
- `GET /api/webhooks?events=true` - List events

### Analytics
- `GET /api/analytics?view=platform` - Platform stats
- `GET /api/analytics?view=dashboard` - Dashboard data
- `GET /api/analytics?view=metrics` - Time-series metrics

## SDK

```typescript
import { NewCoolClient } from '@newcool/sdk';

const client = new NewCoolClient({
  apiUrl: 'https://api.newcool.io',
  apiKey: 'your-api-key'
});

// Music
const tracks = await client.music.getTracks({ genre: 'reggaeton' });

// Education
await client.education.enroll('math-101');

// Government
await client.gov.scheduleCita({ ... });

// Mind OS
await client.mindOs.startSession('deep-focus');
```

## Environment Variables

```env
NEWCOOL_API_URL=http://localhost:3000
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret
```

## Project Structure

```
src/
├── app/
│   └── api/
│       ├── auth/
│       ├── music/
│       ├── courses/
│       ├── gov/
│       ├── mind-os/
│       ├── notifications/
│       ├── webhooks/
│       ├── analytics/
│       ├── search/
│       ├── health/
│       └── status/
├── lib/
│   ├── api-response.ts
│   ├── music-catalog.ts
│   ├── education.ts
│   ├── government.ts
│   ├── mind-os.ts
│   ├── notifications.ts
│   ├── webhooks.ts
│   └── analytics.ts
└── docs/
    └── API.md
```

## Related Repos

- [@newcool/sdk](https://github.com/IANewCool/newcool-sdk) - JavaScript/TypeScript SDK
- [newcool-mcp](https://github.com/IANewCool/newcool-mcp) - MCP Server (32 tools)

## License

MIT - NewCool 2026
