# Persona Assignment

A full-stack chat app where users pick between two personas (Hitesh, Piyush) and chat with them via OpenAI, gated by a simple access key.

## Tech Stack
- Frontend: React + Vite + JavaScript
- Backend: FastAPI + Python (managed with uv)
- No database — personas are hardcoded in `backend/app/persona.py`

## Prerequisites
- Node.js (v18+) and npm installed
- Python 3.11+ installed
- uv installed: `curl -LsSf https://astral.sh/uv/install.sh | sh`
- An OpenAI API key

## Setup — Backend

1. Navigate to backend folder: cd backend
2. Install dependencies: uv sync
3. Create a `.env` file in `backend/` with: MODEL_API_KEY=your_openai_key_here
APP_API_KEY=choose_any_secret_string
4. Run the server: uv run uvicorn app.main:app --reload --port 8001
5. Confirm it works by visiting `http://127.0.0.1:8001/health` — should show `{"status":"ok"}`.

## Setup — Frontend

1. Navigate to frontend folder: cd frontend
2. Install dependencies: npm install
3. Create a `.env` file in `frontend/` with: VITE_API_BASE_URL=http://127.0.0.1:8001
4. Run the dev server: npm run dev
5.  Open the URL shown in terminal (usually `http://localhost:5173`).
6. On the login screen, enter the same value you set for `APP_API_KEY` in the backend `.env`.

## Notes
- The access key entered on login is stored in the browser's sessionStorage only (cleared when tab closes).
- Persona conversation history is kept in browser memory only (not persisted after refresh) and sent with each request since the backend has no database.

## How I Get Data to Create Persona
- I use NotebookLM by google.
- Get 2 youtube live links
- Tell It to give me coversation transcript in the form of {ask:' ', reply:' '}
- Go through it
- Use it as examples
