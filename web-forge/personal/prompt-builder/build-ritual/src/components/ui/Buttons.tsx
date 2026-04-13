import { type ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

const base =
  "inline-flex items-center justify-center gap-2 px-5 py-2.5 font-label text-[11px] uppercase tracking-[0.24em] rounded-sm transition-[background-color,color,border-color,opacity] duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-on-surface/40 focus-visible:ring-offset-0 disabled:opacity-40 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  // The one signature material moment — metallic satin gradient.
  primary:
    "atmospheric-gradient text-on-primary hover:opacity-95 active:opacity-90",
  // Ghost border at 20% opacity; hover brings the border to full.
  secondary:
    "bg-transparent text-on-surface border border-outline-variant/30 hover:border-outline-variant",
  // Tertiary: text only, shift in color indicates interaction.
  ghost:
    "bg-transparent text-on-surface-variant hover:text-on-surface",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ variant = "secondary", className = "", ...rest }, ref) {
    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${className}`}
        {...rest}
      />
    );
  }
);
