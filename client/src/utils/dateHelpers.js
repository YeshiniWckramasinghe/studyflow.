const MS_DAY = 1000 * 60 * 60 * 24

export function startOfDay(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

export function daysUntil(dateStr) {
  if (!dateStr) return null
  const today = startOfDay(new Date())
  const target = startOfDay(dateStr)
  return Math.round((target - today) / MS_DAY)
}

export function formatDate(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function formatDateShort(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function deadlineLabel(dateStr) {
  const diff = daysUntil(dateStr)
  if (diff === null) return { text: 'No due date', tone: 'neutral' }
  if (diff < 0) return { text: `${Math.abs(diff)}d overdue`, tone: 'overdue' }
  if (diff === 0) return { text: 'Due today', tone: 'today' }
  if (diff === 1) return { text: 'Due tomorrow', tone: 'soon' }
  if (diff <= 3) return { text: `Due in ${diff}d`, tone: 'soon' }
  return { text: `Due in ${diff}d`, tone: 'later' }
}
