interface ClayTextareaProps {
  label: string;
  name: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}

export default function ClayTextarea({ label, name, placeholder, rows = 5, required }: ClayTextareaProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-bold uppercase tracking-widest text-clay-muted" style={{ fontFamily: "var(--font-nunito), sans-serif" }}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className="w-full rounded-2xl border-0 bg-clay-pressed px-6 py-4 text-lg text-clay-foreground shadow-clay-pressed transition-all duration-200 placeholder:text-clay-muted focus:bg-white focus:ring-4 focus:ring-clay-accent/20 focus:outline-none resize-none"
      />
    </div>
  );
}
