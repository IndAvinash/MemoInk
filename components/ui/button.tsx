"use client";

import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export default function Button({
  variant = "primary",
  className = "",
  ...props
}: Props) {
  const base =
    "px-5 py-3 rounded-2xl font-medium transition active:scale-[0.98]";

  const variants = {
    primary: "diary-button",
    secondary:
      "bg-secondary text-foreground hover:bg-border border border-border",
    ghost:
      "bg-transparent hover:bg-secondary text-foreground",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}