import { ReactNode } from "react";

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  label: string;
  children?: ReactNode;
}

export function Label({ id, label, children, ...props }: LabelProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-semibold"
        {...props}
      >
        {label}
      </label>
      {children}
    </div>
  )
}