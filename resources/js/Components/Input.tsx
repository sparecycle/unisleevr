import { ComponentProps } from "react";

type ButtonProps = ComponentProps<'input'>;

const Input = (props:ButtonProps) => {
    return (<input {...props} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" />);

};

export default Input;
