import { useState } from 'react'
import Modal from './Modal.jsx'
import { useData } from '../context/DataContext.jsx'
import { COLOR_MAP } from '../utils/colors.js'

const inputCls =
  'w-full rounded-md border border-black/[0.09] bg-white px-3 py-2 text-[14px] text-ink-light placeholder:text-ink-light/35 focus:border-moss-500 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-ink-dark dark:placeholder:text-ink-dark/35'
const labelCls = 'mb-1.5 block text-[12.5px] font-medium text-ink-light/70 dark:text-ink-dark/70'

const COLOR_KEYS = Object.keys(COLOR_MAP)

export default function SubjectModal({ subject, onClose }) {
  const { addSubject, updateSubject } = useData()
  const isEdit = Boolean(subject)
  const [form, setForm] = useState(
    () => subject || { name: '', instructor: '', color: 'moss' },
  )
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) {
      setError('Give the subject a name.')
      return
    }
    setError('')
    setSaving(true)
    try {
      if (isEdit) {
        await updateSubject(subject.id, form)
      } else {
        await addSubject(form)
      }
      onClose()
    } catch (err) {
      setError(err.message || 'Could not save the subject. Is the server running?')
      setSaving(false)
    }
  }

  return (
    <Modal title={isEdit ? 'Edit subject' : 'New subject'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelCls} htmlFor="name">Subject name</label>
          <input
            id="name"
            className={inputCls}
            placeholder="e.g. Chemistry"
            value={form.name}
            onChange={set('name')}
            autoFocus
          />
        </div>
        <div>
          <label className={labelCls} htmlFor="instructor">Instructor (optional)</label>
          <input
            id="instructor"
            className={inputCls}
            placeholder="e.g. Mr. Jayasuriya"
            value={form.instructor || ''}
            onChange={set('instructor')}
          />
        </div>
        <div>
          <span className={labelCls}>Colour tag</span>
          <div className="flex flex-wrap gap-2">
            {COLOR_KEYS.map((key) => (
              <button
                type="button"
                key={key}
                onClick={() => setForm((f) => ({ ...f, color: key }))}
                aria-label={key}
                className={`h-7 w-7 rounded-full ${COLOR_MAP[key].solid} transition-transform ${
                  form.color === key ? 'ring-2 ring-offset-2 ring-ink-light/40 scale-105 dark:ring-offset-[#181D17]' : ''
                }`}
              />
            ))}
          </div>
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
            disabled={saving}
            className="rounded-md bg-moss-500 px-4 py-2 text-[13.5px] font-medium text-white hover:bg-moss-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Add subject'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
