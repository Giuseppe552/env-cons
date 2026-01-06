// src/components/Card.tsx
import React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
};

export default function Card({ children, className, as: Tag = "div" }: CardProps) {
  return <Tag className={`card${className ? ` ${className}` : ""}`}>{children}</Tag>;
}
