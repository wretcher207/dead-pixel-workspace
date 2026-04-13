"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { getContext, resolveSlug } from "@/lib/project-context";
import { getProject } from "@/lib/projects";

type NavItem = { href: string; label: string; requiresProject?: boolean };

const primary: NavItem[] = [
  { href: "/projects", label: "Projects" },
  { href: "/builder", label: "Ritual Builder", requiresProject: true },
  { href: "/output", label: "Output Studio", requiresProject: true },
  { href: "/principles", label: "Principles" },
  { href: "/settings", label: "Settings" },
];

const secondary: NavItem[] = [
  { href: "/support", label: "Support" },
  { href: "/archive", label: "Archive" },
];

export function SidebarNav() {
  const pathname = usePathname();
  const params = useSearchParams();
  const slugParam = params.get("project");

  // Are we currently inside a project-specific workspace?
  const inProjectWorkspace =
    pathname === "/builder" ||
    pathname === "/dna" ||
    pathname === "/output";

  const slug = inProjectWorkspace ? resolveSlug(slugParam ?? undefined) : null;
  const ctx = slug ? getContext(slug) : null;
  const project = slug ? getProject(slug) : null;
  const activeProjectName = ctx?.name ?? project?.name ?? null;
  const query = slug ? `?project=${slug}` : "";

  return (
    <nav
      aria-label="Primary"
      className="fixed left-0 top-0 h-full w-72 bg-surface-container-low flex flex-col justify-between py-12 px-6 z-50"
    >
      {/* Wordmark + active project + nav */}
      <div className="space-y-10">
        <div className="px-4">
          <h1 className="font-headline italic text-[22px] leading-none tracking-tight text-on-surface">
            Build Ritual
          </h1>
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/60 mt-2">
            The Digital Atelier
          </p>
        </div>

        {/* Active project block — only present when the current route
            is a project-scoped workspace. Tells the user at a glance
            which brief they're working inside. */}
        {activeProjectName && (
          <div className="px-4 space-y-2 pb-4 border-b border-outline-variant/15">
            <p className="font-label text-[9px] uppercase tracking-[0.28em] text-on-surface-variant/70">
              Working on
            </p>
            <p className="font-headline italic text-[18px] text-on-surface leading-tight">
              {activeProjectName}
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center font-label text-[9px] uppercase tracking-[0.22em] text-outline-variant hover:text-tertiary transition-colors duration-200"
            >
              ← Switch project
            </Link>
          </div>
        )}

        <ul className="flex flex-col space-y-1">
          {primary.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            // Project-scoped workspace links carry the current slug through.
            const href =
              item.requiresProject && slug ? `${item.href}${query}` : item.href;
            return (
              <li key={item.href}>
                <Link
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "group flex items-center px-4 py-2.5 rounded-sm",
                    "font-label text-sm tracking-wide",
                    "transition-[color,background-color] duration-300",
                    isActive
                      ? "text-on-surface bg-surface-container-high"
                      : "text-outline-variant hover:text-primary hover:bg-surface-container-high/40",
                  ].join(" ")}
                >
                  <span
                    aria-hidden
                    className={[
                      "mr-3 h-4 w-px transition-colors duration-300",
                      isActive
                        ? "bg-tertiary"
                        : "bg-transparent group-hover:bg-outline-variant",
                    ].join(" ")}
                  />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Lower rail — support, archive, profile */}
      <div className="flex flex-col space-y-1">
        {secondary.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="px-4 py-2 font-label text-[11px] uppercase tracking-[0.22em] text-outline-variant hover:text-primary transition-colors duration-300"
          >
            {item.label}
          </Link>
        ))}

        <div className="mt-10 px-4 flex items-center gap-3">
          <div
            aria-hidden
            className="w-9 h-9 rounded-sm bg-surface-bright flex items-center justify-center overflow-hidden"
          >
            <span className="font-headline italic text-sm text-on-surface-variant">
              et
            </span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-body text-xs text-on-surface">
              Elias Thorne
            </span>
            <span className="font-label text-[9px] uppercase tracking-[0.22em] text-on-surface-variant/70 mt-0.5">
              Premium Craftsman
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
