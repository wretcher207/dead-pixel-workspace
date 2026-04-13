import { TopMetaBar } from "@/components/app-shell/TopMetaBar";

type SettingRow = { name: string; value: string; description: string };

const groups: {
  label: string;
  title: string;
  intro: string;
  rows: SettingRow[];
}[] = [
  {
    label: "Group 01",
    title: "Interface",
    intro: "How the workspace looks and feels while you're inside it.",
    rows: [
      {
        name: "Density",
        value: "Spacious",
        description:
          "How much breathing room between elements. Spacious is recommended for long briefing sessions — Compact is better for reviewing many projects at once.",
      },
      {
        name: "Theme nuance",
        value: "Charcoal",
        description:
          "The base surface tone. Charcoal is the default. Black is slightly darker; Graphite is slightly warmer. All stay within the Monastic Workspace palette.",
      },
      {
        name: "Typography preview",
        value: "Newsreader · Manrope",
        description:
          "The type pairing. This is fixed — the system was designed around this pair and changing it breaks the aesthetic contract.",
      },
    ],
  },
  {
    label: "Group 02",
    title: "Defaults",
    intro: "What the app assumes when you start a new project.",
    rows: [
      {
        name: "Default project mode",
        value: "Spec Site",
        description:
          "New projects start as Spec Sites by default. Change to Client Build if most of your new work is paid engagement instead of speculative pitches.",
      },
      {
        name: "Default output tabs",
        value: "Build · Visuals",
        description:
          "Which Output Studio tabs open first after generating prompts. Others remain one click away.",
      },
      {
        name: "Prompt formatting",
        value: "Structured (KERNEL)",
        description:
          "How generated prompts are laid out. Structured follows the KERNEL framework (Context → Task → Constraints → Format). Freeform is closer to a conversational prompt.",
      },
    ],
  },
  {
    label: "Group 03",
    title: "Export",
    intro:
      "What gets written to disk when you export a prompt or a full bundle.",
    rows: [
      {
        name: "Export format",
        value: "Markdown",
        description:
          "Markdown is recommended — it reads cleanly in any editor and round-trips into Claude Code without losing structure. Plain text drops the hierarchy.",
      },
      {
        name: "Include analysis rail",
        value: "Yes",
        description:
          "Whether the right-rail context (brand tone, constraints, assets) is appended to the exported prompt. Leave on — it's what makes the prompt reproducible.",
      },
      {
        name: "Bundle all tabs in one file",
        value: "No",
        description:
          "Off by default. One file per tab keeps each prompt focused and easier to iterate on. Turn on if you prefer single-document handoff.",
      },
    ],
  },
  {
    label: "Group 04",
    title: "Profile",
    intro: "The person behind the workspace.",
    rows: [
      {
        name: "Name",
        value: "Elias Thorne",
        description: "Shown on the sidebar and attached to exported prompts.",
      },
      {
        name: "Role",
        value: "Premium Craftsman",
        description:
          "A label, not a permission. Used only in the sidebar display.",
      },
      {
        name: "Workspace",
        value: "Dead Pixel Design",
        description:
          "The name that appears on exported prompts as the attribution line. Change only if you work under a different business name.",
      },
    ],
  },
];

export default function SettingsPage() {
  return (
    <>
      <TopMetaBar environment="Configuration" title="Settings" />
      <section className="flex-1 px-12 py-10 flex flex-col space-y-14 overflow-y-auto max-w-4xl warm-wash">
        <header className="space-y-3">
          <p className="editorial-label">Workspace · Preferences</p>
          <h3 className="font-headline text-[44px] leading-[1.02] tracking-tight text-on-surface">
            Settings
          </h3>
          <p className="font-body text-[15px] leading-[1.7] text-on-surface-variant max-w-[58ch]">
            Only the preferences that change how Build Ritual looks, feels, and
            exports. No enterprise maze &mdash; most of this you&rsquo;ll set
            once and never touch again.
          </p>
        </header>

        {groups.map((g) => (
          <section key={g.title} className="space-y-5">
            <div className="space-y-2 max-w-[54ch]">
              <p className="editorial-label">{g.label}</p>
              <h4 className="font-headline italic text-[26px] text-on-surface leading-snug">
                {g.title}
              </h4>
              <p className="font-body text-[14px] leading-[1.7] text-on-surface-variant">
                {g.intro}
              </p>
            </div>
            <div className="atmospheric-line" />
            <ul className="space-y-1">
              {g.rows.map((r) => (
                <li
                  key={r.name}
                  className="group grid grid-cols-[1fr_auto] items-start gap-x-8 gap-y-1.5 py-5 border-b border-outline-variant/15"
                >
                  <div className="space-y-1.5">
                    <span className="font-label text-[12px] uppercase tracking-[0.18em] text-on-surface block">
                      {r.name}
                    </span>
                    <p className="helper-text not-italic font-body text-[12.5px] leading-[1.65] text-on-surface-variant">
                      {r.description}
                    </p>
                  </div>
                  <span className="font-label text-[11px] uppercase tracking-[0.22em] text-tertiary whitespace-nowrap pt-0.5">
                    {r.value}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </section>
    </>
  );
}
