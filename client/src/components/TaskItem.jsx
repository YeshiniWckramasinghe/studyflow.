import { useData } from '../context/DataContext.jsx'
import { colorFor } from '../utils/colors.js'
import { deadlineLabel, formatDateShort } from '../utils/dateHelpers.js'

const TONE_CLASSES = {
  overdue: 'text-coral-600 dark:text-coral-400',
  today: 'text-amber-600 dark:text-amber-400',
  soon: 'text-amber-600 dark:text-amber-400',
  later: 'text-ink-light/55 dark:text-ink-dark/55',
  neutral: 'text-ink-light/40 dark:text-ink-dark/40',
}

const PRIORITY_DOT = {
  high: 'bg-coral-500',
  medium: 'bg-amber-500',
  low: 'bg-moss-400',
}

export default function TaskItem({ task, subject, onEdit }) {
  const { toggleTaskStatus, deleteTask } = useData()
  const done = task.status === 'completed'
  const deadline = deadlineLabel(task.dueDate)
  const c = colorFor(subject?.color)

  return (
    <div
      className={`group flex items-start gap-3 rounded-md border border-black/[0.05] bg-white px-4 py-3.5 shadow-card transition-opacity dark:border-white/[0.06] dark:bg-white/[0.03] ${
        done ? 'opacity-60' : ''
      }`}
    >
      <button
        onClick={() => toggleTaskStatus(task.id).catch((err) => window.alert(err.message))}
        aria-label={done ? 'Mark as pending' : 'Mark as completed'}
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
          done
            ? 'border-moss-500 bg-moss-500 text-white'
            : 'border-ink-light/25 text-transparent hover:border-moss-500 dark:border-ink-dark/25'
        }`}
      >
        <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3">
          <path d="M3 8.2 6.2 11.4 13 4.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${PRIORITY_DOT[task.priority] || PRIORITY_DOT.medium}`} />
          <p className={`truncate text-[14.5px] font-medium text-ink-light dark:text-ink-dark ${done ? 'line-through' : ''}`}>
            {task.title}
          </p>
        </div>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px]">
          {subject && (
            <span className={`inline-flex items-center gap-1.5 rounded-sm px-1.5 py-0.5 ${c.bg} ${c.text}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
              {subject.name}
            </span>
          )}
          <span className={TONE_CLASSES[deadline.tone]}>
            {deadline.text} · {formatDateShort(task.dueDate)}
          </span>
        </div>
        {task.notes && <p className="mt-1.5 truncate text-[12.5px] text-ink-light/55 dark:text-ink-dark/50">{task.notes}</p>}
      </div>

      <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
        <button
          onClick={() => onEdit(task)}
          aria-label="Edit task"
          className="rounded-md p-1.5 text-ink-light/45 hover:bg-black/[0.04] hover:text-ink-light dark:text-ink-dark/45 dark:hover:bg-white/[0.06] dark:hover:text-ink-dark"
        >
          <PencilIcon className="h-4 w-4" />
        </button>
        <button
          onClick={() => deleteTask(task.id).catch((err) => window.alert(err.message))}
          aria-label="Delete task"
          className="rounded-md p-1.5 text-ink-light/45 hover:bg-coral-50 hover:text-coral-600 dark:text-ink-dark/45 dark:hover:bg-coral-900/20 dark:hover:text-coral-400"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
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
