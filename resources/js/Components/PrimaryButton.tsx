import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

type ExtendedButton = (
    | ButtonHTMLAttributes<HTMLButtonElement>
    | AnchorHTMLAttributes<HTMLAnchorElement>
) & {
    format?: 'button' | 'link';
    disabled?: boolean;
    href?: string;
};

export default function PrimaryButton({
    className = '',
    disabled,
    children,
    format,
    ...props
}: ExtendedButton) {
    const buttonClasses =
        `inline-flex justify-center items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300 ${
            disabled ? 'opacity-25' : ''
        } ` + className;

    if (format === 'link') {
        return (
            <a
                {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
                className={buttonClasses}
                href={props.href}
                onClick={disabled ? (e) => e.preventDefault() : undefined}
            >
                {children}
            </a>
        );
    } else {
        return (
            <button
                {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
                className={buttonClasses}
                disabled={disabled}
            >
                {children}
            </button>
        );
    }
}
