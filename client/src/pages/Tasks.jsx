import { useMemo, useState } from 'react'
import { useData } from '../context/DataContext.jsx'
import TaskItem from '../components/TaskItem.jsx'
import TaskModal from '../components/TaskModal.jsx'
import EmptyState from '../components/EmptyState.jsx'

const STATUS_FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'completed', label: 'Completed' },
  { key: 'overdue', label: 'Overdue' },
]

export default function Tasks() {
  const { subjects, tasks } = useData()
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [subjectFilter, setSubjectFilter] = useState('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  const filtered = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return tasks
      .filter((t) => {
        if (query.trim() && !t.title.toLowerCase().includes(query.trim().toLowerCase())) return false
        if (subjectFilter !== 'all' && t.subjectId !== subjectFilter) return false
        if (statusFilter === 'pending') return t.status !== 'completed'
        if (statusFilter === 'completed') return t.status === 'completed'
        if (statusFilter === 'overdue') return t.status !== 'completed' && new Date(t.dueDate) < today
        return true
      })
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
  }, [tasks, query, statusFilter, subjectFilter])

  const openEdit = (task) => setEditingTask(task)
  const closeModal = () => {
    setModalOpen(false)
    setEditingTask(null)
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-[24px] font-medium tracking-tight text-ink-light dark:text-ink-dark">Assignments</h1>
          <p className="mt-0.5 text-[13.5px] text-ink-light/55 dark:text-ink-dark/55">{tasks.length} total across {subjects.length} subjects</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          disabled={subjects.length === 0}
          className="flex items-center gap-1.5 rounded-md bg-moss-500 px-3.5 py-2 text-[13.5px] font-medium text-white hover:bg-moss-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <PlusIcon className="h-4 w-4" /> New assignment
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-light/35 dark:text-ink-dark/35" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search assignments…"
          className="w-full rounded-md border border-black/[0.09] bg-white py-2.5 pl-9 pr-3 text-[14px] text-ink-light placeholder:text-ink-light/35 focus:border-moss-500 dark:border-white/[0.1] dark:bg-white/[0.03] dark:text-ink-dark dark:placeholder:text-ink-dark/35"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex gap-1 rounded-md bg-black/[0.04] p-1 dark:bg-white/[0.05]">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setStatusFilter(f.key)}
              className={`rounded-[6px] px-2.5 py-1.5 text-[13px] font-medium transition-colors ${
                statusFilter === f.key
                  ? 'bg-white text-ink-light shadow-sm dark:bg-white/[0.12] dark:text-ink-dark'
                  : 'text-ink-light/55 hover:text-ink-light dark:text-ink-dark/55 dark:hover:text-ink-dark'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className="rounded-md border border-black/[0.09] bg-white px-2.5 py-1.5 text-[13px] text-ink-light dark:border-white/[0.1] dark:bg-white/[0.03] dark:text-ink-dark"
        >
          <option value="all">All subjects</option>
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>

      {/* Task list */}
      {subjects.length === 0 ? (
        <EmptyState
          icon="📚"
          title="Add a subject first"
          message="Assignments belong to a subject. Create one to start adding tasks."
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="No assignments match"
          message="Try a different search term or filter."
        />
      ) : (
        <div className="space-y-2.5">
          {filtered.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              subject={subjects.find((s) => s.id === task.subjectId)}
              onEdit={openEdit}
            />
          ))}
        </div>
      )}

      {(modalOpen || editingTask) && <TaskModal task={editingTask} onClose={closeModal} />}
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
function SearchIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-3.8-3.8" strokeLinecap="round" />
    </svg>
  )
}
