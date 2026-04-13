interface FilterOption {
  label: string
  value: string
}

interface FilterGroup {
  name: string
  options: FilterOption[]
  value: string
  onChange: (value: string) => void
}

interface FilterBarProps {
  filters: FilterGroup[]
}

export default function FilterBar({ filters }: FilterBarProps) {
  return (
    <div className="flex items-center gap-5 mb-6 bg-surface-container-low/50 px-4 py-3 rounded-xl border border-white/[0.03]">
      {filters.map((group) => (
        <div key={group.name} className="flex items-center gap-2.5">
          <span className="font-label text-[11px] uppercase tracking-[0.15em] text-on-surface-variant/40">
            {group.name}
          </span>
          <select
            value={group.value}
            onChange={(e) => group.onChange(e.target.value)}
            className="bg-surface-container-lowest border-0 border-b-2 border-transparent focus:border-primary text-sm text-on-surface px-3 py-1.5 rounded-sm font-label outline-none appearance-none cursor-pointer"
          >
            {group.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  )
}
