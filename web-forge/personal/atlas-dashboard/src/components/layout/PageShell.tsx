import type { ReactNode } from 'react'

interface PageShellProps {
  children: ReactNode
}

export default function PageShell({ children }: PageShellProps) {
  return (
    <main className="ml-64 pt-16 min-h-screen px-10 py-8 bg-surface">
      <div className="max-w-[1600px]">
        {children}
      </div>
    </main>
  )
}
