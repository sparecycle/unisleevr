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
    initialState = true,
    parentSetter,
}: Props) => {
    const [isChecked, setIsChecked] = useState(initialState);
    return (
        <button className="flex items-center justify-start gap-2 p-2">
            <div
                className={twMerge(
                    'border w-6 h-6 rounded border-solid border-gray-300',
                    isChecked && 'border-white',
                )}
            >
                {isChecked && <IoIosCheckmark className='fill-white w-full h-full' />}
            </div>
            {label}
        </button>
    );
};
export default LabeledCheckbox;
