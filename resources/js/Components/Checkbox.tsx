import { InputHTMLAttributes } from 'react';

export default function Checkbox({
    className = '',
    ...props
}: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded-sm border-zinc-300 text-indigo-600 shadow-xs focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:ring-indigo-600 dark:focus:ring-offset-zinc-800 ' +
                className
            }
        />
    );
}
