import { NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext.jsx'

const LINKS = [
  { to: '/', label: 'Dashboard', icon: DashboardIcon },
  { to: '/tasks', label: 'Assignments', icon: TaskIcon },
  { to: '/subjects', label: 'Subjects', icon: SubjectIcon },
]

export default function Sidebar({ onNavigate }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <aside className="flex h-full w-full flex-col bg-moss-800 text-moss-50 dark:bg-[#0E1310]">
      <div className="px-6 pt-8 pb-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-amber-500 font-display text-lg font-semibold text-moss-900">
            S
          </span>
          <span className="font-display text-xl font-medium tracking-tight">StudyFlow</span>
        </div>
        <p className="mt-1.5 text-[13px] leading-snug text-moss-200/70">
          Your subjects, assignments and deadlines — in one binder.
        </p>
      </div>

      <nav className="flex-1 px-3">
        {LINKS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            onClick={onNavigate}
            className={({ isActive }) =>
              [
                'tab-notch group mb-1 flex items-center gap-3 rounded-l-md px-3.5 py-2.5 text-[14.5px] font-medium transition-colors',
                isActive
                  ? 'bg-paper-light text-moss-800 dark:bg-paper-dark dark:text-moss-100'
                  : 'text-moss-100/80 hover:bg-moss-700/60 hover:text-white',
              ].join(' ')
            }
          >
            <Icon className="h-[18px] w-[18px] shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-moss-700/60 px-4 py-4">
        <button
          onClick={toggleTheme}
          className="flex w-full items-center justify-between rounded-md px-2.5 py-2 text-[13.5px] text-moss-100/85 transition-colors hover:bg-moss-700/50"
        >
          <span className="flex items-center gap-2">
            {theme === 'dark' ? <MoonIcon className="h-4 w-4" /> : <SunIcon className="h-4 w-4" />}
            {theme === 'dark' ? 'Dark mode' : 'Light mode'}
          </span>
          <span
            className={`relative h-5 w-9 rounded-full transition-colors ${
              theme === 'dark' ? 'bg-amber-500' : 'bg-moss-600'
            }`}
          >
            <span
              className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                theme === 'dark' ? 'translate-x-4' : 'translate-x-0.5'
              }`}
            />
          </span>
        </button>
      </div>
    </aside>
  )
}

function DashboardIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3.5" y="3.5" width="7" height="9" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="5.5" rx="1.5" />
      <rect x="13.5" y="12" width="7" height="8.5" rx="1.5" />
      <rect x="3.5" y="15.5" width="7" height="5" rx="1.5" />
    </svg>
  )
}
function TaskIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="4" y="3.5" width="16" height="17" rx="2" />
      <path d="M8 8.5h8M8 12.5h8M8 16.5h5" strokeLinecap="round" />
    </svg>
  )
}
function SubjectIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M4 5.5c0-1.1.9-2 2-2h11a1 1 0 0 1 1 1v14.5a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2v-12.5Z" />
      <path d="M4 17.5c0-1.1.9-2 2-2h11" />
    </svg>
  )
}
function SunIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <circle cx="12" cy="12" r="4" />
      <path
        strokeLinecap="round"
        d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
      />
    </svg>
  )
}
function MoonIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M20 14.2A8.5 8.5 0 1 1 9.8 4a7 7 0 0 0 10.2 10.2Z" />
    </svg>
  )
}
