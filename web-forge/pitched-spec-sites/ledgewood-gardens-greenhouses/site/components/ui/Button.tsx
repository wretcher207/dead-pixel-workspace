import { type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant = "primary" | "ghost" | "ghost-dark";

type CommonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

type AnchorProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className"> & {
    href: string;
  };

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & {
    href?: undefined;
  };

const variantClass: Record<Variant, string> = {
  primary: "btn btn-primary",
  ghost: "btn btn-ghost",
  "ghost-dark": "btn btn-ghost-dark",
};

export function Button(props: AnchorProps | ButtonProps) {
  const { variant = "primary", children, className = "", ...rest } = props;
  const classes = `${variantClass[variant]} ${className}`.trim();
  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorRest } = rest as AnchorProps;
    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...(rest as ButtonProps)}>
      {children}
    </button>
  );
}
