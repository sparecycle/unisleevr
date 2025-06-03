import { InertiaLinkProps, Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-hidden ' +
                (active
                    ? 'border-indigo-400 text-zinc-900 focus:border-indigo-700 dark:border-indigo-600 dark:text-zinc-100'
                    : 'border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-700 focus:border-zinc-300 focus:text-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-300 dark:focus:border-zinc-700 dark:focus:text-zinc-300') +
                className
            }
        >
            {children}
        </Link>
    );
}
