import { ComponentProps } from 'react';

type Props = ComponentProps<'button'>;
const Button = ({ children, ...props }: Props) => {
    return (
        <button
            {...props}
            className={
                'btn bg-lg rounded-md border border-solid border-slate-600 px-3 py-2'
            }
        >
            {children}
        </button>
    );
};

export default Button;
