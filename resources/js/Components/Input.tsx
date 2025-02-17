import { ComponentProps } from 'react';

type ButtonProps = ComponentProps<'input'>;

const Input = (props: ButtonProps) => {
    return (
        <input
            {...props}
            className="block w-full rounded-lg border border-zinc-300 bg-zinc-50 p-4 ps-10 text-sm text-zinc-900 focus:border-blue-500 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white dark:placeholder-zinc-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        />
    );
};

export default Input;
