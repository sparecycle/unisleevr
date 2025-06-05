import { ReactNode } from 'react';

type Props = {
    icon?: ReactNode;
    text: string;
};
const IconText = ({ icon, text }: Props) => {
    return (
        <div className="flex flex-col gap-2 text-center text-sm">
            {icon && icon}
            <p className="text-base">{text}</p>
        </div>
    );
};

export default IconText;
