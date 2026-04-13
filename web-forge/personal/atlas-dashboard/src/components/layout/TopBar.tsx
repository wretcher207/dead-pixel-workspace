import { mockDashboard } from '../../data/mock-dashboard'

export default function TopBar() {
  const { systemHealth, alerts } = mockDashboard

  return (
    <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 z-40 bg-gradient-to-b from-surface-container-low/40 to-surface/80 backdrop-blur-xl flex justify-between items-center px-10 border-b border-outline-variant/10">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2.5">
          <span
            className={`w-2 h-2 rounded-full ${
              systemHealth.score >= 70 ? 'bg-tertiary shadow-[0_0_6px_rgba(63,223,165,0.4)]' : 'bg-error shadow-[0_0_6px_rgba(255,180,171,0.4)]'
            }`}
          />
          <span className="font-label font-bold text-xs tracking-tight text-on-surface-variant">
            Health: {systemHealth.score}%
          </span>
        </div>
        <div className="w-px h-4 bg-outline-variant/15" />
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-error shadow-[0_0_6px_rgba(255,180,171,0.4)]" />
          <span className="font-label font-bold text-xs tracking-tight text-on-surface-variant">
            Alerts: {alerts.length}
          </span>
        </div>
        <div className="w-px h-4 bg-outline-variant/15" />
        <div className="flex items-center gap-2">
          <span className="font-label text-xs tracking-tight text-on-surface-variant/40">
            Last Scan: 2m ago
          </span>
        </div>
      </div>
      <button className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-5 py-1.5 rounded-lg font-label font-bold text-xs tracking-tight hover:brightness-110 hover:shadow-[0_0_12px_rgba(114,135,255,0.2)] active:scale-[0.98] transition-all">
        Quick Scan
      </button>
    </header>
  )
}
