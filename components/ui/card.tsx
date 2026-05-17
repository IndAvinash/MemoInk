import { ReactNode } from "react";

export default function Card({
  children,
  className = "",
  pd = "6",
  ...props
}: React.ComponentProps<"div">&{
  children: ReactNode;
  pd?: string;

}) {
  return (
    <div className={`diary-card p-${pd} ${className}`} {...props}>
      {children}
    </div>
  );
}