export default function EmptyState({ icon, title, message, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-black/[0.12] px-6 py-14 text-center dark:border-white/[0.14]">
      {icon && <div className="mb-3 text-3xl">{icon}</div>}
      <p className="font-display text-[17px] font-medium text-ink-light dark:text-ink-dark">{title}</p>
      {message && <p className="mt-1 max-w-xs text-[13.5px] text-ink-light/55 dark:text-ink-dark/55">{message}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
