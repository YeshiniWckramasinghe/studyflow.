import 'dotenv/config'
import mongoose from 'mongoose'
import { connectDB } from './config/db.js'
import Subject from './models/Subject.js'
import Task from './models/Task.js'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/studyflow'

function inDays(n) {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return d
}

async function seed() {
  await connectDB(MONGODB_URI)

  await Task.deleteMany({})
  await Subject.deleteMany({})

  const [physics, maths, english] = await Subject.insertMany([
    { name: 'Physics', color: 'moss', instructor: 'Dr. Perera' },
    { name: 'Mathematics', color: 'amber', instructor: 'Mrs. Silva' },
    { name: 'English Literature', color: 'coral', instructor: 'Mr. Fernando' },
  ])

  await Task.insertMany([
    { title: 'Kinematics problem set', subjectId: physics.id, dueDate: inDays(1), priority: 'high', status: 'pending', notes: 'Chapter 3, questions 1–12' },
    { title: 'Essay: Macbeth ambition theme', subjectId: english.id, dueDate: inDays(3), priority: 'medium', status: 'pending', notes: '' },
    { title: 'Calculus revision worksheet', subjectId: maths.id, dueDate: inDays(-1), priority: 'high', status: 'pending', notes: 'Overdue — check with Mrs. Silva' },
    { title: 'Lab report: pendulum motion', subjectId: physics.id, dueDate: inDays(6), priority: 'medium', status: 'completed', notes: '' },
    { title: 'Read Act II', subjectId: english.id, dueDate: inDays(0), priority: 'low', status: 'completed', notes: '' },
  ])

  console.log('[studyflow] Seed data inserted.')
  await mongoose.disconnect()
  process.exit(0)
}

seed().catch((err) => {
  console.error('[studyflow] Seed failed:', err)
  process.exit(1)
})
