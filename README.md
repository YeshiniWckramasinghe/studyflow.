# StudyFlow — Student Study Planner

A full-stack app for managing subjects, assignments, deadlines, and study progress.

- **Frontend**: React 18 + Vite + React Router + Tailwind CSS + Recharts
- **Backend**: Node.js + Express + MongoDB (Mongoose)

Data now lives in MongoDB — nothing is stored in the browser except your dark/light mode preference.

```
studyflow/
  client/    React frontend (Vite)
  server/    Express API + MongoDB models
```

## 1. Prerequisites

- Node.js 18+
- A MongoDB instance — either:
  - **Local**: install MongoDB Community Server and have it running on `mongodb://127.0.0.1:27017`, or
  - **Atlas** (free tier): create a cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas) and copy its connection string.

## 2. Setup

```bash
# from the studyflow/ root
npm run install:all
```

Then create your env files from the examples:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Open `server/.env` and set `MONGODB_URI` to your local or Atlas connection string.

## 3. Seed some sample data (optional but recommended)

```bash
npm run seed
```

This inserts 3 sample subjects and 5 sample assignments so the dashboard isn't empty on first run.

## 4. Run it

```bash
# from the studyflow/ root — starts both server (port 5000) and client (port 5173)
npm run dev
```

Or run them separately in two terminals:

```bash
cd server && npm run dev
cd client && npm run dev
```

Open `http://localhost:5173`.

## API overview

| Method | Route                    | Description                          |
|--------|---------------------------|---------------------------------------|
| GET    | `/api/subjects`           | List all subjects                     |
| POST   | `/api/subjects`           | Create a subject                      |
| PUT    | `/api/subjects/:id`       | Update a subject                      |
| DELETE | `/api/subjects/:id`       | Delete a subject (and its tasks)      |
| GET    | `/api/tasks`               | List tasks (`?subjectId=&status=`)    |
| POST   | `/api/tasks`               | Create a task                         |
| PUT    | `/api/tasks/:id`           | Update a task                         |
| PATCH  | `/api/tasks/:id/toggle`    | Flip a task between pending/completed |
| DELETE | `/api/tasks/:id`           | Delete a task                         |

## Features

- 📚 Subjects — add/edit/delete, colour-tagged
- 📝 Assignments — add/edit/delete, linked to a subject
- 📅 Due dates with priority (low/medium/high)
- ✅ Toggle completed/pending with one click
- ⏰ Dashboard with upcoming-deadlines list
- 📊 Completion progress ring + per-subject workload chart
- 🔍 Search assignments by title, filter by status/subject
- 🌙 Dark/Light mode (saved locally)
- 📱 Responsive — sidebar nav on desktop, drawer on mobile

## Troubleshooting

- **"Can't reach the StudyFlow API" banner**: the backend isn't running, or `MONGODB_URI` is wrong. Check the `server` terminal for a connection error.
- **CORS error in the browser console**: make sure `CLIENT_ORIGIN` in `server/.env` matches the URL the frontend is running on (default `http://localhost:5173`).
- **Changed the API port?**: update `VITE_API_URL` in `client/.env` to match.
