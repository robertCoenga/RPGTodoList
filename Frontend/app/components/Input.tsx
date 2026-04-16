type InputProps = {
  placeholder?: string;
  type: string;
  className?: string;
  readOnly?: boolean;
};

export function Input({ placeholder, type, className, readOnly }: InputProps) {
  return (
    <input
      placeholder={placeholder}
      type={type}
      className={className}
      readOnly={readOnly}
    />
  );
}
