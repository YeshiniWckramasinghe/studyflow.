import { useState } from 'react'
import Modal from './Modal.jsx'
import { useData } from '../context/DataContext.jsx'

const inputCls =
  'w-full rounded-md border border-black/[0.09] bg-white px-3 py-2 text-[14px] text-ink-light placeholder:text-ink-light/35 focus:border-moss-500 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-ink-dark dark:placeholder:text-ink-dark/35'
const labelCls = 'mb-1.5 block text-[12.5px] font-medium text-ink-light/70 dark:text-ink-dark/70'

export default function TaskModal({ task, defaultSubjectId, onClose }) {
  const { subjects, addTask, updateTask } = useData()
  const isEdit = Boolean(task)
  const [form, setForm] = useState(
    () =>
      task || {
        title: '',
        subjectId: defaultSubjectId || subjects[0]?.id || '',
        dueDate: new Date().toISOString().slice(0, 10),
        priority: 'medium',
        status: 'pending',
        notes: '',
      },
  )
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) {
      setError('Give the assignment a title.')
      return
    }
    if (!form.subjectId) {
      setError('Choose a subject.')
      return
    }
    setError('')
    setSaving(true)
    try {
      if (isEdit) {
        await updateTask(task.id, form)
      } else {
        await addTask(form)
      }
      onClose()
    } catch (err) {
      setError(err.message || 'Could not save the assignment. Is the server running?')
      setSaving(false)
    }
  }

  return (
    <Modal title={isEdit ? 'Edit assignment' : 'New assignment'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelCls} htmlFor="title">Title</label>
          <input
            id="title"
            className={inputCls}
            placeholder="e.g. Chapter 5 problem set"
            value={form.title}
            onChange={set('title')}
            autoFocus
          />
        </div>

        <div>
          <label className={labelCls} htmlFor="subject">Subject</label>
          {subjects.length === 0 ? (
            <p className="text-[13px] text-ink-light/55 dark:text-ink-dark/55">
              Add a subject first, then link this assignment to it.
            </p>
          ) : (
            <select id="subject" className={inputCls} value={form.subjectId} onChange={set('subjectId')}>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls} htmlFor="dueDate">Due date</label>
            <input id="dueDate" type="date" className={inputCls} value={form.dueDate} onChange={set('dueDate')} />
          </div>
          <div>
            <label className={labelCls} htmlFor="priority">Priority</label>
            <select id="priority" className={inputCls} value={form.priority} onChange={set('priority')}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div>
          <label className={labelCls} htmlFor="notes">Notes (optional)</label>
          <textarea
            id="notes"
            className={inputCls}
            rows={2}
            placeholder="Any extra detail..."
            value={form.notes}
            onChange={set('notes')}
          />
        </div>

        {error && <p className="text-[13px] text-coral-600 dark:text-coral-400">{error}</p>}

        <div className="flex items-center justify-end gap-2 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-3.5 py-2 text-[13.5px] font-medium text-ink-light/70 hover:bg-black/[0.05] dark:text-ink-dark/70 dark:hover:bg-white/[0.06]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={subjects.length === 0 || saving}
            className="rounded-md bg-moss-500 px-4 py-2 text-[13.5px] font-medium text-white hover:bg-moss-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Add assignment'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
