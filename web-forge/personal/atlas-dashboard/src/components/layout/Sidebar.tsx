import { NavLink } from 'react-router-dom'

const navItems = [
  { path: '/', icon: 'dashboard', label: 'Overview' },
  { path: '/supervisor', icon: 'security', label: 'Supervisor' },
  { path: '/janitor', icon: 'cleaning_services', label: 'Janitor' },
  { path: '/mechanic', icon: 'settings_suggest', label: 'Mechanic' },
  { path: '/gatekeeper', icon: 'shield', label: 'Gatekeeper' },
  { path: '/archivist', icon: 'database', label: 'Archivist' },
  { path: '/scout', icon: 'radar', label: 'Scout' },
  { path: '/history', icon: 'history', label: 'History' },
  { path: '/approval-queue', icon: 'verified_user', label: 'Approval Queue' },
]

export default function Sidebar() {
  return (
    <aside className="h-screen w-64 fixed left-0 top-0 border-r border-outline-variant/15 bg-surface shadow-[32px_0_32px_rgba(0,0,0,0.06)] flex flex-col py-8 px-4 z-50">
      <div className="mb-8 px-2">
        <h1 className="text-2xl font-black text-primary tracking-tighter">ATLAS</h1>
        <p className="font-label uppercase tracking-widest text-[10px] text-on-surface-variant/50 mt-0.5">
          Precision Control
        </p>
      </div>

      <div className="mx-2 mb-4 h-px bg-outline-variant/10" />

      <nav className="flex-1 space-y-0.5 overflow-y-auto no-scrollbar px-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 active:scale-[0.98] ${
                isActive
                  ? 'text-primary border-l-2 border-primary bg-primary/[0.08]'
                  : 'text-on-surface-variant/50 hover:text-on-surface-variant hover:bg-surface-container-low/60'
              }`
            }
          >
            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
            <span className={`font-label uppercase tracking-widest text-[11px]`}>
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto border-t border-outline-variant/10 pt-5 px-3">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-2 py-2 rounded-lg transition-colors ${
              isActive ? 'text-primary bg-primary/[0.08]' : 'text-on-surface-variant/50 hover:text-on-surface-variant hover:bg-surface-container-low/60'
            }`
          }
        >
          <span className="material-symbols-outlined text-[20px]">settings</span>
          <span className="font-label uppercase tracking-widest text-[11px]">
            Settings
          </span>
        </NavLink>
      </div>
    </aside>
  )
}
