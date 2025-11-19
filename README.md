# TaskBoard — Task & Chat Web App

Fullstack app using React (Vite) + Tailwind for UI, Node/Express + MongoDB for backend, JWT auth, and optional Socket.IO for real-time chat.

## Quick start

### Backend

1. `cd backend`
2. `cp .env.example .env` and fill MONGO_URI and JWT_SECRET
3. `npm install`
4. `npm run dev`

### Frontend

1. `cd frontend`
2. `npm install`
3. `npm run dev`

Open the frontend dev URL (usually http://localhost:5173). The backend server runs on port 5000 by default.

## Notes
- The chat uses simple polling by default. Socket.IO optional code is included in backend & frontend (commented). Activate it if you prefer real-time.
