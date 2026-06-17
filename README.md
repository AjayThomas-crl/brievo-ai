<div align="center">
  <h1>⚡ Brievo AI</h1>
  <p><strong>Turn meetings into momentum.</strong></p>
  <p>
    <img src="https://img.shields.io/badge/status-active-10b981?style=flat-square" alt="Status" />
    <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="License" />
  </p>
</div>

---

## What is Brievo AI?

Brievo AI transforms raw meeting transcripts into polished, actionable summaries. Drop in a transcript, and in seconds you get a concise AI-generated brief — complete with extracted tasks, priorities, deadlines, and estimated durations. One click pushes those tasks straight to your Google Calendar.

No more rewatching recordings. No more chasing notes. Just clarity.

## Features

- **AI-Powered Summaries** — Paste any meeting transcript and get a premium, executive-assistant-level summary in seconds.
- **Smart Task Extraction** — Action items are automatically surfaced with priority (High / Medium / Low), date, time, and estimated duration.
- **Google Calendar Sync** — Select tasks and add them to your Google Calendar in one click.
- **Google OAuth** — Secure sign-in with your Google account. No passwords, no friction.
- **Dark UI** — Clean, modern interface built with shadcn/ui and Tailwind CSS.

## Tech Stack

| Layer    | Technology |
|----------|-----------|
| Frontend | React 19, Vite, TypeScript, Tailwind CSS 4, shadcn/ui |
| Backend  | FastAPI (Python), Google Gemini API |
| Auth     | Firebase (Google OAuth) |
| Calendar | Google Calendar API |

## Project Structure

```
brievo-ai/
├── backend/
│   └── main.py              # FastAPI server + Gemini integration
├── frontend/
│   └── src/
│       ├── components/      # UI components (TaskCard, sidebar, etc.)
│       ├── pages/           # NewMeeting, History, LandingPage
│       ├── lib/             # Firebase config, Calendar helpers
│       ├── types/           # TypeScript type definitions
│       └── context/         # Auth context provider
└── .gitignore
```

## Getting Started

### Prerequisites

- **Python 3.11+**
- **Node.js 20+**
- **Google Cloud Project** with the following APIs enabled:
  - Gemini API
  - Google Calendar API
- **Firebase Project** with Google OAuth configured

### Environment Setup

```bash
# Backend
cd backend
python -m venv .venv
source .venv/bin/activate
pip install fastapi uvicorn google-genai python-dotenv
```

Create `backend/.env`:

```env
GEMINI_API_KEY=your_gemini_api_key
```

```bash
# Frontend
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_BACKEND_URL=http://localhost:8000
```

### Running Locally

```bash
# Terminal 1 — Backend
cd backend
source .venv/bin/activate
uvicorn main:app --reload --port 8000

# Terminal 2 — Frontend
cd frontend
npm run dev
```

Open **http://localhost:5173** and sign in with Google.

## API

### `POST /analyze`

Submit a meeting transcript for analysis.

**Request**

```json
{
  "text": "Alice: Let's finalize the dashboard designs by Friday. Bob: I'll handle API integration — should take about 3 hours. ..."
}
```

**Response**

```json
{
  "summary": "The team reviewed project progress and set clear next steps. Dashboard designs are targeted for Friday, and API integration work has been assigned to Bob.",
  "tasks": [
    {
      "task": "Finalize dashboard designs",
      "priority": "High",
      "description": "Complete all dashboard mockups and get sign-off before EOW.",
      "date": "June 20, 2026",
      "time": "5:00 PM",
      "duration": "2 hours"
    }
  ]
}
```

## License

MIT © Brievo AI
