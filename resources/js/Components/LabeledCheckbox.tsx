import { IoIosCheckmark } from 'react-icons/io';

type Props = {
    label: string;
};

const LabeledCheckbox = ({label = "checkbox label"}:Props) => {
    return (
        <button className="flex items-center justify-start gap-2 p-2">
            <IoIosCheckmark />
            {label}
        </button>
    );
};
export default LabeledCheckbox;
