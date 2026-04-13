interface ActionButtonsProps {
  onApprove?: () => void
  onReject?: () => void
  onDefer?: () => void
  size?: 'sm' | 'md'
}

export default function ActionButtons({ onApprove, onReject, onDefer, size = 'sm' }: ActionButtonsProps) {
  const base = size === 'sm' ? 'px-3 py-1.5 text-[10px]' : 'px-4 py-2 text-xs min-w-[72px]'

  return (
    <div className="flex items-center gap-1.5">
      {onDefer && (
        <button
          onClick={(e) => { e.stopPropagation(); onDefer() }}
          className={`${base} rounded-lg font-label font-bold uppercase tracking-wider text-on-surface-variant/50 border border-outline-variant/15 hover:bg-surface-container-highest hover:text-on-surface-variant/70 transition-colors active:scale-[0.98]`}
        >
          Defer
        </button>
      )}
      {onReject && (
        <button
          onClick={(e) => { e.stopPropagation(); onReject() }}
          className={`${base} rounded-lg font-label font-bold uppercase tracking-wider text-error border border-error/15 hover:bg-error-container/20 transition-colors active:scale-[0.98]`}
        >
          Reject
        </button>
      )}
      {onApprove && (
        <button
          onClick={(e) => { e.stopPropagation(); onApprove() }}
          className={`${base} rounded-lg font-label font-bold uppercase tracking-wider bg-gradient-to-br from-primary to-primary-container text-on-primary hover:brightness-110 transition-all active:scale-[0.98]`}
        >
          Approve
        </button>
      )}
    </div>
  )
}
