import { Suspense } from "react";
import { SidebarNav } from "@/components/app-shell/SidebarNav";
import { TeachingModeProvider } from "@/components/teaching/TeachingModeProvider";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TeachingModeProvider>
      <div className="min-h-screen bg-surface">
        {/* Suspense boundary required because SidebarNav uses
            useSearchParams (for the active-project indicator).
            Fallback matches the sidebar frame so there's no layout jump. */}
        <Suspense
          fallback={
            <nav
              aria-label="Primary"
              className="fixed left-0 top-0 h-full w-72 bg-surface-container-low z-50"
            />
          }
        >
          <SidebarNav />
        </Suspense>
        <main className="ml-72 min-h-screen flex flex-col">{children}</main>
      </div>
    </TeachingModeProvider>
  );
}
