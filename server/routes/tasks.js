import { Router } from 'express'
import mongoose from 'mongoose'
import Task from '../models/Task.js'

const router = Router()

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id)
}

// GET /api/tasks  (optional query: ?subjectId=&status=)
router.get('/', async (req, res, next) => {
  try {
    const filter = {}
    if (req.query.subjectId) filter.subjectId = req.query.subjectId
    if (req.query.status) filter.status = req.query.status
    const tasks = await Task.find(filter).sort({ dueDate: 1 })
    res.json(tasks)
  } catch (err) {
    next(err)
  }
})

// POST /api/tasks
router.post('/', async (req, res, next) => {
  try {
    const { title, subjectId, dueDate, priority, status, notes } = req.body
    if (!title || !title.trim()) return res.status(400).json({ error: 'Task title is required.' })
    if (!subjectId || !isValidId(subjectId)) return res.status(400).json({ error: 'A valid subjectId is required.' })
    if (!dueDate) return res.status(400).json({ error: 'Due date is required.' })

    const task = await Task.create({ title: title.trim(), subjectId, dueDate, priority, status, notes })
    res.status(201).json(task)
  } catch (err) {
    next(err)
  }
})

// PUT /api/tasks/:id
router.put('/:id', async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ error: 'Invalid task id.' })
    const { title, subjectId, dueDate, priority, status, notes } = req.body
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, subjectId, dueDate, priority, status, notes },
      { new: true, runValidators: true },
    )
    if (!task) return res.status(404).json({ error: 'Task not found.' })
    res.json(task)
  } catch (err) {
    next(err)
  }
})

// PATCH /api/tasks/:id/toggle  (flip pending <-> completed)
router.patch('/:id/toggle', async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ error: 'Invalid task id.' })
    const task = await Task.findById(req.params.id)
    if (!task) return res.status(404).json({ error: 'Task not found.' })
    task.status = task.status === 'completed' ? 'pending' : 'completed'
    await task.save()
    res.json(task)
  } catch (err) {
    next(err)
  }
})

// DELETE /api/tasks/:id
router.delete('/:id', async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ error: 'Invalid task id.' })
    const task = await Task.findByIdAndDelete(req.params.id)
    if (!task) return res.status(404).json({ error: 'Task not found.' })
    res.status(204).send()
  } catch (err) {
    next(err)
  }
})

export default router
