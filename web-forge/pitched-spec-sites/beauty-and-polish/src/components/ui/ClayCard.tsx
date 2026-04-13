interface ClayCardProps {
  children: React.ReactNode;
  variant?: "glass" | "solid" | "glass-strong";
  hover?: boolean;
  className?: string;
}

const variantStyles = {
  glass: "bg-white/60 backdrop-blur-xl",
  solid: "bg-white",
  "glass-strong": "bg-white/80 backdrop-blur-xl",
};

export default function ClayCard({ children, variant = "glass", hover = false, className = "" }: ClayCardProps) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-[32px] p-6 sm:p-8
        text-clay-foreground shadow-clay-card
        ${variantStyles[variant]}
        ${hover ? "transition-all duration-500 hover:-translate-y-2 hover:shadow-clay-card-hover" : ""}
        ${className}
      `}
    >
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </div>
  );
}
