// src/components/Card.tsx
import React from "react";

type CardVariant = "default" | "soft" | "outline" | "cta";
type CardPadding = "sm" | "md" | "lg";
type CardHover = "lift" | "none";
type CardAlign = "left" | "center";

type PolymorphicProps<T extends React.ElementType> = {
  as?: T;

  // IMPORTANT: children must be optional for React.forwardRef typing to behave.
  children?: React.ReactNode;

  className?: string;

  /**
   * Variant hooks for CSS targeting without Tailwind.
   * Default keeps current site appearance.
   */
  variant?: CardVariant;

  /**
   * Optional padding override. If omitted, your .card CSS controls padding.
   */
  padding?: CardPadding;

  /**
   * Controls hover behaviour on a per-card basis.
   * Default keeps the existing “premium lift” feel.
   */
  hover?: CardHover;

  /**
   * Convenience alignment for content-heavy cards (e.g. Contact).
   */
  align?: CardAlign;

  /**
   * Pass-through style. Use sparingly; prefer globals.css.
   */
  style?: React.CSSProperties;
} & Omit<
  React.ComponentPropsWithoutRef<T>,
  "as" | "children" | "className" | "style"
>;

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const PAD_MAP: Record<CardPadding, string> = {
  sm: "14px",
  md: "18px",
  lg: "22px"
};

// Polymorphic callable signature (what you WANT to use at call sites)
type CardComponent = <T extends React.ElementType = "div">(
  props: PolymorphicProps<T> & { ref?: React.ComponentPropsWithRef<T>["ref"] }
) => React.ReactElement | null;

/**
 * NOTE:
 * React.forwardRef does not play nicely with generic render functions.
 * The simplest reliable approach is:
 *  - implement with `any` internally
 *  - expose a polymorphic call signature via `as unknown as CardComponent`
 */
function CardInner(
  props: PolymorphicProps<any>,
  ref: React.ForwardedRef<any>
) {
  const {
    as,
    children,
    className,
    variant = "default",
    padding,
    hover = "lift",
    align = "left",
    style,
    ...rest
  } = props;

  const Tag = (as ?? "div") as React.ElementType;

  const mergedStyle: React.CSSProperties = {
    ...(padding ? { padding: PAD_MAP[padding] } : null),
    ...(align === "center" ? { textAlign: "center" } : null),
    ...style
  };

  return (
    <Tag
      ref={ref}
      className={cx(
        "card",
        className,
        variant !== "default" && `card--${variant}`,
        hover === "none" && "card--nohover",
        align === "center" && "card--center"
      )}
      data-card=""
      data-variant={variant}
      data-hover={hover}
      data-align={align}
      style={mergedStyle}
      {...(rest as any)}
    >
      {children}
    </Tag>
  );
}

const Card = React.forwardRef(CardInner) as unknown as CardComponent;

export default Card;
