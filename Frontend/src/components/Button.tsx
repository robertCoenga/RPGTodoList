type ButtonProps = {
  label: string;
  className: string;
  onClick: () => void;
};

export function Button({ label, className, onClick }: ButtonProps) {
  return (
    <button className={className} onClick={onClick} type="button">
      {label}
    </button>
  );
}
