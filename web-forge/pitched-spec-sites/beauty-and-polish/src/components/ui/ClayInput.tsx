interface ClayInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

export default function ClayInput({ label, name, type = "text", placeholder, required }: ClayInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-bold uppercase tracking-widest text-clay-muted" style={{ fontFamily: "var(--font-nunito), sans-serif" }}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="h-16 w-full rounded-2xl border-0 bg-clay-pressed px-6 py-4 text-lg text-clay-foreground shadow-clay-pressed transition-all duration-200 placeholder:text-clay-muted focus:bg-white focus:ring-4 focus:ring-clay-accent/20 focus:outline-none"
      />
    </div>
  );
}
