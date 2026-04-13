interface AlertBannerProps {
  title: string
  message: string
  onAction?: () => void
  actionLabel?: string
}

export default function AlertBanner({ title, message, actionLabel = 'View All Alerts', onAction }: AlertBannerProps) {
  return (
    <div className="mb-8 px-5 py-4 bg-error-container/15 border border-error/10 border-l-4 border-l-error rounded-xl flex items-center justify-between">
      <div className="flex items-center gap-4">
        <span className="material-symbols-outlined text-error text-[22px]">report_problem</span>
        <div>
          <h4 className="font-label text-xs font-bold uppercase tracking-widest text-error">
            {title}
          </h4>
          <p className="text-sm text-on-error-container/70 mt-0.5">{message}</p>
        </div>
      </div>
      <button
        onClick={onAction}
        className="text-[11px] font-bold uppercase tracking-wider text-error px-3 py-1.5 rounded-lg bg-error/10 hover:bg-error/20 transition-colors whitespace-nowrap"
      >
        {actionLabel}
      </button>
    </div>
  )
}
