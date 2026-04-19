# From the Other Side

A full-stack paranormal sightings web application built with **Node.js** — no external frameworks.

Users can browse ghost sighting reports, submit new ones, and receive live paranormal news updates via a real-time stream.

> This project was developed as part of the "__The Backend Developer Path__" course on [Scrimba](https://scrimba.com).

---

## Technologies & Modules

### Runtime
- **Node.js** — native HTTP server, no external frameworks
- **ES Modules** (`"type": "module"`) — the entire codebase uses `import`/`export`

### Native Node.js modules used

| Module | Usage |
|---|---|
| `node:http` | HTTP server creation (`http.createServer`) |
| `node:fs/promises` | Async file reading and writing (`fs.readFile`, `fs.writeFile`) |
| `node:path` | File path construction (`path.join`, `path.extname`) |
| `node:crypto` | UUID generation for new sightings (`randomUUID`) |
| `node:events` | Event-driven architecture (`EventEmitter`) for sighting-added alerts |

### NPM Packages

| Package | Version | Usage |
|---|---|---|
| [`sanitize-html`](https://www.npmjs.com/package/sanitize-html) | `^2.17.2` | Sanitizes user-submitted text fields in POST requests to prevent XSS |

---

## Project Structure

```
from-the-other-side/
├── server.js                  # Application entry point and route definitions
├── package.json
├── data/
│   ├── data.json              # Persistent storage for ghost sightings
│   └── stories.js             # Static list of paranormal news headlines
├── events/
│   └── sightingEvents.js      # EventEmitter instance for sighting-added events
├── handlers/
│   └── routeHandlers.js       # Request handlers: GET, POST sightings and SSE news
├── public/                    # Static frontend files served directly
│   ├── index.html
│   ├── index.css
│   ├── index.js
│   ├── news.html
│   ├── news.js
│   ├── sightings.html
│   ├── upload-sighting.html
│   ├── upload-sighting.js
│   ├── 404.html
│   └── images/
└── utils/
    ├── addNewSighting.js      # Appends a new sighting to data.json with a UUID
    ├── createAlert.js         # Logs a console alert when a new sighting is added
    ├── getContentType.js      # Maps file extensions to MIME content types
    ├── getData.js             # Reads and parses sightings from data.json
    ├── parseJSONBody.js       # Streams and parses the request body as JSON
    ├── sanitizeObject.js      # Sanitizes all string fields of an object
    ├── sendResponse.js        # Helper to write status code, headers, and body
    └── serveStatic.js         # Serves static files from /public, with 404 fallback
```

---

## Installation & Setup

### Prerequisites
- Node.js installed (recommended: v18+)

### Clone and install dependencies
```bash
git clone <repository-url>
cd from-the-other-side
npm install
```

### Start the server (with auto-reload)
```bash
npm start
```

> Uses Node.js's native `--watch` flag (available from v18+).

Server runs at: `http://localhost:8000`

---

## API Routes

### `GET /api`

Returns all ghost sightings stored in `data/data.json`.

**Response:** `200 OK` — `application/json`

**Example:**
```
GET http://localhost:8000/api
```

```json
[
  {
    "uuid": "a9f1c6e5-9383-4d12-b28d-734c9370f861",
    "location": "Exeter, UK",
    "timeStamp": "7 Jan 2025 at 09:30",
    "title": "The Phantom Warning",
    "text": "I was drifting through town..."
  }
]
```

---

### `POST /api`

Submits a new ghost sighting. The body is sanitized with `sanitize-html` before being saved. A UUID is automatically generated and assigned. A `sighting-added` event is emitted after a successful save.

**Request body:** `application/json`

| Field | Type | Required | Description |
|---|---|---|---|
| `location` | `string` | Yes | Location where the sighting occurred |
| `timeStamp` | `string` | Yes | Date and time of the sighting |
| `title` | `string` | Yes | Short title for the sighting |
| `text` | `string` | Yes | Full description of the sighting |

**Example:**
```
POST http://localhost:8000/api
Content-Type: application/json

{
  "location": "London, UK",
  "timeStamp": "19 Apr 2026 at 21:00",
  "title": "Shadow in the Hallway",
  "text": "A tall dark figure passed through the corridor..."
}
```

**Response:** `201 Created` — returns the saved sighting object (with UUID).

**Error response:** `400 Bad Request` — if the request body is not valid JSON.

```json
{ "error": "Invalid JSON format: ..." }
```

---

### `GET /api/news`

Opens a **Server-Sent Events (SSE)** stream. Every 3 seconds, the server pushes a randomly selected paranormal news headline from `data/stories.js`.

**Response headers:**
```
Content-Type: text/event-stream
Cache-Control: no-cache
Connection: keep-alive
```

**Event payload format:**
```
data: {"event":"news-update","story":"BBC: London Underground ghost sighting scares party-goers"}
```

---

### Static files

Any request that does not start with `/api` is treated as a static file request and served from the `public/` directory.

| Behaviour | Details |
|---|---|
| `/` | Serves `public/index.html` |
| Any other path | Serves the matching file from `public/` |
| File not found | Serves `public/404.html` with status `404` |
| Other server errors | Returns a plain HTML `500` response |

---

## Sighting Object Structure

```json
{
  "uuid": "a9f1c6e5-9383-4d12-b28d-734c9370f861",
  "location": "Exeter, UK",
  "timeStamp": "7 Jan 2025 at 09:30",
  "title": "The Phantom Warning",
  "text": "I was drifting through town, lost in thought..."
}
```

---

## Available Scripts (`package.json`)

| Script | Command | Description |
|---|---|---|
| `start` | `node --watch server.js` | Starts the server with native hot-reload |

---

## Dependencies

```bash
npm install sanitize-html
```