import Link from "next/link";

interface ClayButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "default" | "lg";
  href?: string;
  external?: boolean;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}

const variantStyles = {
  primary: "bg-gradient-to-br from-clay-accent-light to-clay-accent text-white shadow-clay-button hover:shadow-clay-button-hover",
  secondary: "bg-white text-clay-foreground shadow-clay-button hover:shadow-clay-button-hover",
  outline: "border-2 border-clay-accent/20 bg-transparent text-clay-accent hover:border-clay-accent hover:bg-clay-accent/5",
  ghost: "text-clay-foreground hover:bg-clay-accent/10 hover:text-clay-accent",
};

const sizeStyles = {
  sm: "h-11 px-5 text-sm",
  default: "h-14 px-8 text-base",
  lg: "h-16 px-10 text-lg",
};

export default function ClayButton({
  children,
  variant = "primary",
  size = "default",
  href,
  external = false,
  className = "",
  type = "button",
  onClick,
}: ClayButtonProps) {
  const baseStyles = `inline-flex items-center justify-center font-bold tracking-wide rounded-[20px] transition-all duration-200 hover:-translate-y-1 active:scale-[0.92] active:shadow-clay-pressed focus-visible:ring-4 focus-visible:ring-clay-accent/30 focus-visible:ring-offset-2`;
  const styles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={styles} style={{ fontFamily: "var(--font-nunito), sans-serif" }}>
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={styles} style={{ fontFamily: "var(--font-nunito), sans-serif" }}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={styles} style={{ fontFamily: "var(--font-nunito), sans-serif" }}>
      {children}
    </button>
  );
}
