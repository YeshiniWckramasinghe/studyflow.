import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import subjectsRouter from './routes/subjects.js'
import tasksRouter from './routes/tasks.js'

const app = express()
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/studyflow'
const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173').split(',').map((s) => s.trim())

app.use(cors({ origin: allowedOrigins }))
app.use(express.json())

app.get('/api/health', (req, res) => res.json({ ok: true, service: 'studyflow-api' }))
app.use('/api/subjects', subjectsRouter)
app.use('/api/tasks', tasksRouter)

// 404 for unmatched API routes
app.use('/api', (req, res) => res.status(404).json({ error: 'Not found.' }))

// Centralized error handler
app.use((err, req, res, next) => {
  console.error(err)
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }
  res.status(500).json({ error: 'Something went wrong on the server.' })
})

connectDB(MONGODB_URI).then(() => {
  app.listen(PORT, () => console.log(`[studyflow] API listening on http://localhost:${PORT}`))
})
