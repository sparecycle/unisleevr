import { ComponentProps } from 'react';

type Props = ComponentProps<'a'>;
const ButtonLink = ({
    children,
    disabled,
    ...props
}: Props & { disabled?: boolean }) => {
    return (
        <a
            {...props}
            className={`btn bg-lg rounded-md border border-solid border-slate-600 px-3 py-2 ${
                disabled ? 'pointer-events-none opacity-25' : ''
            }`}
            onClick={(e) => disabled && e.preventDefault()}
        >
            {children}
        </a>
    );
};

export default ButtonLink;
