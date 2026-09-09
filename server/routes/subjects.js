import { Router } from 'express'
import mongoose from 'mongoose'
import Subject from '../models/Subject.js'
import Task from '../models/Task.js'

const router = Router()

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id)
}

// GET /api/subjects
router.get('/', async (req, res, next) => {
  try {
    const subjects = await Subject.find().sort({ createdAt: 1 })
    res.json(subjects)
  } catch (err) {
    next(err)
  }
})

// POST /api/subjects
router.post('/', async (req, res, next) => {
  try {
    const { name, instructor, color } = req.body
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Subject name is required.' })
    }
    const subject = await Subject.create({ name: name.trim(), instructor, color })
    res.status(201).json(subject)
  } catch (err) {
    next(err)
  }
})

// PUT /api/subjects/:id
router.put('/:id', async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ error: 'Invalid subject id.' })
    const { name, instructor, color } = req.body
    const subject = await Subject.findByIdAndUpdate(
      req.params.id,
      { name, instructor, color },
      { new: true, runValidators: true },
    )
    if (!subject) return res.status(404).json({ error: 'Subject not found.' })
    res.json(subject)
  } catch (err) {
    next(err)
  }
})

// DELETE /api/subjects/:id  (cascades: also deletes its tasks)
router.delete('/:id', async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ error: 'Invalid subject id.' })
    const subject = await Subject.findByIdAndDelete(req.params.id)
    if (!subject) return res.status(404).json({ error: 'Subject not found.' })
    await Task.deleteMany({ subjectId: req.params.id })
    res.status(204).send()
  } catch (err) {
    next(err)
  }
})

export default router
