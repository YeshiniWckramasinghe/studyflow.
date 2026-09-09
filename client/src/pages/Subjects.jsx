import { useState } from 'react'
import { useData } from '../context/DataContext.jsx'
import { colorFor } from '../utils/colors.js'
import SubjectModal from '../components/SubjectModal.jsx'
import EmptyState from '../components/EmptyState.jsx'

export default function Subjects() {
  const { subjects, tasks, deleteSubject } = useData()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingSubject, setEditingSubject] = useState(null)

  const closeModal = () => {
    setModalOpen(false)
    setEditingSubject(null)
  }

  const handleDelete = (subject) => {
    const count = tasks.filter((t) => t.subjectId === subject.id).length
    const msg =
      count > 0
        ? `Delete "${subject.name}" and its ${count} assignment${count === 1 ? '' : 's'}? This can't be undone.`
        : `Delete "${subject.name}"?`
    if (window.confirm(msg)) {
      deleteSubject(subject.id).catch((err) => window.alert(err.message))
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-[24px] font-medium tracking-tight text-ink-light dark:text-ink-dark">Subjects</h1>
          <p className="mt-0.5 text-[13.5px] text-ink-light/55 dark:text-ink-dark/55">{subjects.length} subjects in your binder</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-1.5 rounded-md bg-moss-500 px-3.5 py-2 text-[13.5px] font-medium text-white hover:bg-moss-600"
        >
          <PlusIcon className="h-4 w-4" /> New subject
        </button>
      </div>

      {subjects.length === 0 ? (
        <EmptyState
          icon="📘"
          title="No subjects yet"
          message="Add your first subject — physics, history, whatever's on your timetable."
          action={
            <button
              onClick={() => setModalOpen(true)}
              className="rounded-md bg-moss-500 px-4 py-2 text-[13.5px] font-medium text-white hover:bg-moss-600"
            >
              Add a subject
            </button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((s) => {
            const subjTasks = tasks.filter((t) => t.subjectId === s.id)
            const done = subjTasks.filter((t) => t.status === 'completed').length
            const pct = subjTasks.length === 0 ? 0 : Math.round((done / subjTasks.length) * 100)
            const c = colorFor(s.color)
            return (
              <div
                key={s.id}
                className={`rounded-lg border-l-4 ${c.border} border-t border-r border-b border-black/[0.06] bg-white p-4 shadow-card dark:border-white/[0.07] dark:bg-white/[0.03]`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="truncate font-display text-[16.5px] font-medium text-ink-light dark:text-ink-dark">{s.name}</h3>
                    {s.instructor && <p className="mt-0.5 truncate text-[12.5px] text-ink-light/55 dark:text-ink-dark/55">{s.instructor}</p>}
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <button
                      onClick={() => setEditingSubject(s)}
                      aria-label={`Edit ${s.name}`}
                      className="rounded-md p-1.5 text-ink-light/40 hover:bg-black/[0.05] hover:text-ink-light dark:text-ink-dark/40 dark:hover:bg-white/[0.08] dark:hover:text-ink-dark"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(s)}
                      aria-label={`Delete ${s.name}`}
                      className="rounded-md p-1.5 text-ink-light/40 hover:bg-coral-50 hover:text-coral-600 dark:text-ink-dark/40 dark:hover:bg-coral-900/20 dark:hover:text-coral-400"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-[12px] text-ink-light/55 dark:text-ink-dark/55">
                    <span>{subjTasks.length === 0 ? 'No assignments yet' : `${done}/${subjTasks.length} done`}</span>
                    {subjTasks.length > 0 && <span>{pct}%</span>}
                  </div>
                  {subjTasks.length > 0 && (
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-black/[0.06] dark:bg-white/[0.08]">
                      <div className={`h-full rounded-full ${c.dot}`} style={{ width: `${pct}%` }} />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {(modalOpen || editingSubject) && <SubjectModal subject={editingSubject} onClose={closeModal} />}
    </div>
  )
}

function PlusIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  )
}
function PencilIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M4 20.5 4.6 16.4 15.9 5.1a1.8 1.8 0 0 1 2.5 0l1.5 1.5a1.8 1.8 0 0 1 0 2.5L8.6 20 4 20.5Z" />
    </svg>
  )
}
function TrashIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M5 7.5h14M9.5 7.5V5.8c0-.7.6-1.3 1.3-1.3h2.4c.7 0 1.3.6 1.3 1.3V7.5M7 7.5 7.7 19a1.8 1.8 0 0 0 1.8 1.7h5c1 0 1.7-.7 1.8-1.7l.7-11.5" strokeLinecap="round" />
    </svg>
  )
}
