// Static class strings so Tailwind's scanner can find them at build time.
export const COLOR_MAP = {
  moss: {
    dot: 'bg-moss-500',
    bg: 'bg-moss-50 dark:bg-white/[0.04]',
    text: 'text-moss-600 dark:text-moss-300',
    ring: 'ring-moss-200 dark:ring-moss-700',
    solid: 'bg-moss-500',
    border: 'border-moss-500',
  },
  amber: {
    dot: 'bg-amber-500',
    bg: 'bg-amber-50 dark:bg-white/[0.04]',
    text: 'text-amber-600 dark:text-amber-300',
    ring: 'ring-amber-200 dark:ring-amber-700',
    solid: 'bg-amber-500',
    border: 'border-amber-500',
  },
  coral: {
    dot: 'bg-coral-500',
    bg: 'bg-coral-50 dark:bg-white/[0.04]',
    text: 'text-coral-600 dark:text-coral-300',
    ring: 'ring-coral-200 dark:ring-coral-700',
    solid: 'bg-coral-500',
    border: 'border-coral-500',
  },
  plum: {
    dot: 'bg-plum-500',
    bg: 'bg-plum-50 dark:bg-white/[0.04]',
    text: 'text-plum-600 dark:text-plum-300',
    ring: 'ring-plum-200 dark:ring-plum-700',
    solid: 'bg-plum-500',
    border: 'border-plum-500',
  },
  teal: {
    dot: 'bg-teal-500',
    bg: 'bg-teal-50 dark:bg-white/[0.04]',
    text: 'text-teal-600 dark:text-teal-300',
    ring: 'ring-teal-200 dark:ring-teal-700',
    solid: 'bg-teal-500',
    border: 'border-teal-500',
  },
  slate: {
    dot: 'bg-slate-500',
    bg: 'bg-slate-50 dark:bg-white/[0.04]',
    text: 'text-slate-600 dark:text-slate-300',
    ring: 'ring-slate-200 dark:ring-slate-700',
    solid: 'bg-slate-500',
    border: 'border-slate-500',
  },
}

export function colorFor(key) {
  return COLOR_MAP[key] || COLOR_MAP.slate
}
