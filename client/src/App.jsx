import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Tasks from './pages/Tasks.jsx'
import Subjects from './pages/Subjects.jsx'
import { useData } from './context/DataContext.jsx'

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { loading, error, refresh } = useData()

  return (
    <div className="min-h-screen bg-paper-light text-ink-light dark:bg-paper-dark dark:text-ink-dark">
      {/* Desktop sidebar */}
      <div className="fixed inset-y-0 left-0 hidden w-64 lg:block">
        <Sidebar />
      </div>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-black/[0.06] bg-paper-light/95 px-4 py-3 backdrop-blur lg:hidden dark:border-white/[0.07] dark:bg-paper-dark/95">
        <button
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
          className="rounded-md p-1.5 text-ink-light hover:bg-black/[0.05] dark:text-ink-dark dark:hover:bg-white/[0.08]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
            <path d="M4 6.5h16M4 12h16M4 17.5h16" strokeLinecap="round" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-500 font-display text-[15px] font-semibold text-moss-900">S</span>
          <span className="font-display text-[16px] font-medium">StudyFlow</span>
        </div>
        <div className="w-7" />
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDrawerOpen(false)} />
          <div className="relative h-full w-72 max-w-[80vw]">
            <Sidebar onNavigate={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}

      <main className="px-4 py-6 sm:px-7 sm:py-8 lg:ml-64 lg:px-10 lg:py-9">
        <div className="mx-auto max-w-5xl">
          {error ? (
            <ConnectionError message={error} onRetry={refresh} />
          ) : loading ? (
            <LoadingState />
          ) : (
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/subjects" element={<Subjects />} />
            </Routes>
          )}
        </div>
      </main>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-moss-500 border-t-transparent" />
      <p className="mt-3 text-[13.5px] text-ink-light/55 dark:text-ink-dark/55">Loading your study data…</p>
    </div>
  )
}

function ConnectionError({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-coral-300 bg-coral-50 px-6 py-14 text-center dark:border-coral-700/50 dark:bg-coral-900/10">
      <div className="mb-3 text-3xl">🔌</div>
      <p className="font-display text-[17px] font-medium text-ink-light dark:text-ink-dark">Can't reach the StudyFlow API</p>
      <p className="mt-1 max-w-sm text-[13.5px] text-ink-light/60 dark:text-ink-dark/60">{message}</p>
      <p className="mt-1 max-w-sm text-[12.5px] text-ink-light/45 dark:text-ink-dark/45">
        Make sure the backend is running (<code>npm run dev</code> inside <code>server/</code>) and MongoDB is up.
      </p>
      <button
        onClick={onRetry}
        className="mt-4 rounded-md bg-moss-500 px-4 py-2 text-[13.5px] font-medium text-white hover:bg-moss-600"
      >
        Try again
      </button>
    </div>
  )
}
