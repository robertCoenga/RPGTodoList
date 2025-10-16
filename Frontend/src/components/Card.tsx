import type { ReactNode } from "react";

type CardProps = {
  id?: string;
  className?: string;
  children: ReactNode;
};
export function Card({ id, className, children }: CardProps) {
  return (
    <div id={id} className={className}>
      {children}
    </div>
  );
}
