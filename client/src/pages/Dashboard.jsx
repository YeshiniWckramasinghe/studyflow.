import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext.jsx'
import { colorFor } from '../utils/colors.js'
import { daysUntil } from '../utils/dateHelpers.js'
import ProgressRing from '../components/ProgressRing.jsx'
import TaskItem from '../components/TaskItem.jsx'
import TaskModal from '../components/TaskModal.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

export default function Dashboard() {
  const { subjects, tasks } = useData()
  const [editingTask, setEditingTask] = useState(null)

  const stats = useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter((t) => t.status === 'completed').length
    const pending = total - completed
    const overdue = tasks.filter((t) => t.status !== 'completed' && daysUntil(t.dueDate) < 0).length
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100)
    return { total, completed, pending, overdue, percent }
  }, [tasks])

  const upcoming = useMemo(() => {
    return tasks
      .filter((t) => t.status !== 'completed')
      .slice()
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 5)
  }, [tasks])

  const chartData = useMemo(() => {
    return subjects.map((s) => {
      const subjTasks = tasks.filter((t) => t.subjectId === s.id)
      return {
        name: s.name.length > 10 ? s.name.slice(0, 9) + '…' : s.name,
        Completed: subjTasks.filter((t) => t.status === 'completed').length,
        Pending: subjTasks.filter((t) => t.status !== 'completed').length,
        color: s.color,
      }
    })
  }, [subjects, tasks])

  const greeting = useMemo(() => {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning'
    if (h < 17) return 'Good afternoon'
    return 'Good evening'
  }, [])

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <div className="space-y-7">
      <div>
        <p className="text-[13px] text-ink-light/55 dark:text-ink-dark/55">{today}</p>
        <h1 className="mt-0.5 font-display text-[26px] font-medium tracking-tight text-ink-light dark:text-ink-dark">
          {greeting}. Here's where things stand.
        </h1>
      </div>


      {subjects.length === 0 && (
        <div className="rounded-lg border border-dashed border-amber-300 bg-amber-50 px-5 py-4 dark:border-amber-700/50 dark:bg-amber-900/10">
          <p className="font-display text-[15px] font-medium text-ink-light dark:text-ink-dark">
            Add your first subject to get started
          </p>
          <p className="mt-1 text-[13px] text-ink-light/60 dark:text-ink-dark/60">
            Subjects group your assignments — physics, history, whatever's on your timetable.
          </p>
          <Link
            to="/subjects"
            className="mt-3 inline-block rounded-md bg-moss-500 px-3.5 py-2 text-[13px] font-medium text-white hover:bg-moss-600"
          >
            Go to Subjects
          </Link>
        </div>
      )}

      

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Total tasks" value={stats.total} />
        <StatCard label="Completed" value={stats.completed} tone="moss" />
        <StatCard label="Pending" value={stats.pending} tone="amber" />
        <StatCard label="Overdue" value={stats.overdue} tone="coral" />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
        {/* Progress + chart */}
        <div className="lg:col-span-2 rounded-lg border border-black/[0.06] bg-white p-5 shadow-card dark:border-white/[0.07] dark:bg-white/[0.03]">
          <h2 className="font-display text-[16px] font-medium text-ink-light dark:text-ink-dark">Overall progress</h2>
          <div className="mt-4 flex items-center justify-center">
            <ProgressRing percent={stats.percent} label={`${stats.percent}%`} sublabel="complete" />
          </div>
          <p className="mt-4 text-center text-[13px] text-ink-light/55 dark:text-ink-dark/55">
            {stats.completed} of {stats.total} assignments done
          </p>
        </div>

        <div className="lg:col-span-3 rounded-lg border border-black/[0.06] bg-white p-5 shadow-card dark:border-white/[0.07] dark:bg-white/[0.03]">
          <h2 className="font-display text-[16px] font-medium text-ink-light dark:text-ink-dark">Load by subject</h2>
          {chartData.length === 0 ? (
            <p className="mt-6 text-[13.5px] text-ink-light/55 dark:text-ink-dark/55">
              Add a subject to see your workload broken down.
            </p>
          ) : (
            <div className="mt-2 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-black/[0.06] dark:stroke-white/[0.08]" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#8A9089' }} axisLine={false} tickLine={false} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#8A9089' }} axisLine={false} tickLine={false} width={24} />
                  <Tooltip
                    contentStyle={{ borderRadius: 8, border: '1px solid rgba(0,0,0,0.08)', fontSize: 12.5 }}
                    cursor={{ fill: 'rgba(76,122,94,0.06)' }}
                  />
                  <Bar dataKey="Completed" stackId="a" fill="#4C7A5E" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="Pending" stackId="a" fill="#E8A33D" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      {/* Upcoming deadlines */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-[17px] font-medium text-ink-light dark:text-ink-dark">Upcoming deadlines</h2>
        </div>
        {upcoming.length === 0 ? (
          <EmptyState
            icon="🎉"
            title="Nothing due soon"
            message="You're all caught up — add an assignment to start tracking new deadlines."
          />
        ) : (
          <div className="space-y-2.5">
            {upcoming.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                subject={subjects.find((s) => s.id === task.subjectId)}
                onEdit={setEditingTask}
              />
            ))}
          </div>
        )}
      </div>

      {editingTask && <TaskModal task={editingTask} onClose={() => setEditingTask(null)} />}
    </div>
  )
}

function StatCard({ label, value, tone }) {
  const toneCls = tone ? colorFor(tone).text : 'text-ink-light dark:text-ink-dark'
  return (
    <div className="rounded-lg border border-black/[0.06] bg-white px-4 py-3.5 shadow-card dark:border-white/[0.07] dark:bg-white/[0.03]">
      <p className="text-[12.5px] text-ink-light/50 dark:text-ink-dark/50">{label}</p>
      <p className={`mt-1 font-display text-[26px] font-semibold ${toneCls}`}>{value}</p>
    </div>
  )
}
