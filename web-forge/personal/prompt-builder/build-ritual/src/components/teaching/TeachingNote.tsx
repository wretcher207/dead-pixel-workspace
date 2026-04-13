"use client";

import { useTeachingMode } from "./TeachingModeProvider";

type TeachingNoteProps = {
  children: React.ReactNode;
  /** Override the default "Why" label. */
  label?: string;
};

export function TeachingNote({ children, label = "Why" }: TeachingNoteProps) {
  const { enabled } = useTeachingMode();
  if (!enabled) return null;

  return (
    <aside className="mt-3 pl-4 border-l border-tertiary/30 space-y-1.5">
      <p className="editorial-label text-tertiary/80">{label}</p>
      <div className="helper-text text-on-surface">{children}</div>
    </aside>
  );
}
