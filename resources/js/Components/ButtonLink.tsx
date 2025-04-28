import { ComponentProps } from 'react';

type Props = ComponentProps<'a'>;
const ButtonLink = ({ children, ...props }: Props) => {
    return (
        <a
            {...props}
            className={
                'btn bg-lg rounded-md border border-solid border-slate-600 px-3 py-2 disabled:opacity-25'
            }
        >
            {children}
        </a>
    );
};

export default ButtonLink;
