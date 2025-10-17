type InputProps = {
  placeholder?: string;
  type: string;
  className?: string;
};

export function Input({ placeholder, type, className }: InputProps) {
  return <input placeholder={placeholder} type={type} className={className} />;
}
