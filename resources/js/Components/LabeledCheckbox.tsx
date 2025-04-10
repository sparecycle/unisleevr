import { Dispatch, SetStateAction, useState } from 'react';
import { IoIosCheckmark } from 'react-icons/io';
import { twMerge } from 'tailwind-merge';

type Props = {
    label: string;
    initialState?: boolean;
    parentSetter?: Dispatch<SetStateAction<boolean>>;
};

const LabeledCheckbox = ({
    label = 'checkbox label',
    initialState = false,
    parentSetter,
}: Props) => {
    const [isChecked, setIsChecked] = useState(initialState);
    const handleClick = () => {
        setIsChecked(!isChecked);
    };
    return (
        <button
            className="flex items-center justify-start gap-2 p-2"
            onClick={handleClick}
        >
            <div
                className={twMerge(
                    'h-6 w-6 rounded border border-solid border-gray-300',
                    isChecked && 'border-white',
                )}
            >
                {isChecked && (
                    <IoIosCheckmark className="h-full w-full fill-white" />
                )}
            </div>
            {label}
        </button>
    );
};
export default LabeledCheckbox;
