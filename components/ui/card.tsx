import { ReactNode } from "react";

export default function Card({
  children,
  className = "",
  pd = "6",
}: {
  children: ReactNode;
  className?: string;
  pd?: string;
}) {
  return (
    <div className={`diary-card p-${pd} ${className}`}>
      {children}
    </div>
  );
}