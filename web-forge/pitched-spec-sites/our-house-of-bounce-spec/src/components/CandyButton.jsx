const baseClasses =
  'inline-flex min-h-12 items-center justify-center gap-3 rounded-full border-2 px-6 py-3 text-sm font-bold tracking-[0.01em] transition-all duration-300 ease-[var(--bounce)] focus-visible:outline-none focus-visible:ring-0';

const variants = {
  primary:
    'candy-button bg-[var(--accent)] text-white shadow-[4px_4px_0_0_var(--accent-shadow)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--accent-shadow)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_0_var(--accent-shadow)]',
  secondary:
    'border-[var(--accent-shadow)] bg-transparent text-[var(--foreground)] hover:bg-[var(--tertiary)] hover:text-[var(--foreground)] active:translate-y-px',
};

function CandyButton({
  href,
  children,
  icon,
  variant = 'primary',
  className = '',
  ...props
}) {
  const combinedClassName = `${baseClasses} ${variants[variant]} ${className}`.trim();

  return (
    <a className={combinedClassName} href={href} {...props}>
      <span>{children}</span>
      {icon ? (
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-[var(--accent)]">
          {icon}
        </span>
      ) : null}
    </a>
  );
}

export default CandyButton;
