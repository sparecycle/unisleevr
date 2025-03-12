import { ComponentProps } from "react";

type Props = ComponentProps<'button'>;
const Button = ({children, ...props}:Props) => {
    return (
        <button {...props}
            className={'btn bg-lg border border-solid rounded-md px-3 py-2 border-slate-600'}
        >{children}</button>
    );
};

export default Button;
