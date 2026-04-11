import { type HTMLAttributes, forwardRef } from "react";

type Props = HTMLAttributes<HTMLElement> & {
  id?: string;
  as?: "section" | "article" | "div";
  bleed?: boolean;
  tone?: "ivory" | "cream" | "moss" | "none";
};

const toneClasses: Record<NonNullable<Props["tone"]>, string> = {
  ivory: "bg-ivory text-charcoal",
  cream: "bg-cream text-charcoal",
  moss: "bg-moss text-ivory",
  none: "",
};

export const Section = forwardRef<HTMLElement, Props>(function Section(
  { id, as = "section", bleed = false, tone = "none", className = "", children, ...rest },
  ref,
) {
  const Tag = as as "section";
  return (
    <Tag
      ref={ref}
      id={id}
      className={`section relative ${toneClasses[tone]} ${className}`}
      {...rest}
    >
      <div className={bleed ? "" : "container-site"}>{children}</div>
    </Tag>
  );
});
