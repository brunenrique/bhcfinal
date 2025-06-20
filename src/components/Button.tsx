import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

export function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={clsx(
        'px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90',
        className,
      )}
      {...props}
    />
  );
}
