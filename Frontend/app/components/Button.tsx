import type { JSX } from "react";

type ButtonProps = {
  icon?: JSX.Element;
  label?: string;
  className: string;
  onClick: () => void;
};

export function Button({ icon, label, className, onClick }: ButtonProps) {
  return (
    <button className={className} onClick={onClick} type="button">
      {icon}
      {label}
    </button>
  );
}
