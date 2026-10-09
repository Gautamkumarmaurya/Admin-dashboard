const accents = {
  blue: {
    border: 'from-blue-400 to-cyan-300',
    glow: 'bg-blue-400/10',
    icon: 'bg-gradient-to-br from-blue-400/20 to-cyan-400/10 text-cyan-200 ring-blue-300/20',
  },
  violet: {
    border: 'from-violet-400 to-fuchsia-300',
    glow: 'bg-violet-400/10',
    icon: 'bg-gradient-to-br from-violet-400/20 to-fuchsia-400/10 text-violet-200 ring-violet-300/20',
  },
  teal: {
    border: 'from-teal-300 to-emerald-300',
    glow: 'bg-teal-400/10',
    icon: 'bg-gradient-to-br from-teal-400/20 to-emerald-400/10 text-teal-200 ring-teal-300/20',
  },
  amber: {
    border: 'from-amber-300 to-orange-300',
    glow: 'bg-amber-400/10',
    icon: 'bg-gradient-to-br from-amber-400/20 to-orange-400/10 text-amber-200 ring-amber-300/20',
  },
};

export default function StatCard({ title, value, change, icon: Icon, color = 'violet' }) {
  const accent = accents[color] ?? accents.violet;

  return (
    <div className="panel dashboard-stat-card group relative overflow-hidden p-5">
      <div className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${accent.border} opacity-90`} />
      <div className={`absolute -right-10 -top-12 h-36 w-36 rounded-full ${accent.glow} opacity-70 blur-3xl transition-opacity duration-300 group-hover:opacity-100`} />
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-400">{title}</p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">{value}</h3>
        </div>
        <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ring-1 shadow-lg shadow-black/10 transition-transform duration-300 group-hover:-translate-y-0.5 ${accent.icon}`}>
          <Icon size={21} strokeWidth={2} />
        </span>
      </div>
      <p className="mt-5 flex items-center gap-1.5 text-xs">
        {change !== '—' && <span className="font-semibold text-emerald-400">↑ {change}</span>}
        <span className="muted">{change === '—' ? 'Live data' : 'vs last month'}</span>
      </p>
    </div>
  );
}