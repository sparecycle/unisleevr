import { ComponentProps } from "react";
import { IoIosClose } from "react-icons/io";

type Props = ComponentProps<'button'> & {showClose: boolean};

const NametagButton = ({'aria-label':ariaLabel, disabled, onClick, children, showClose = false}:Props) => {
    return (
        <button
            type="button"
            aria-label={ariaLabel}
            className="group/nametag flex items-center rounded-md bg-zinc-800 px-2 py-1 group-hover/nametag:bg-zinc-700"
            disabled={disabled}
            onClick={onClick}
        >
            {children}
                {showClose  && (
                    <IoIosClose className="opacity-0 transition-opacity duration-200 ease-in-out group-hover/nametag:opacity-100" />
                )}
        </button>
    )
};

export default NametagButton;
