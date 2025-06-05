import { ReactNode } from 'react';

type Props = {
    icon?: ReactNode;
    text: string;
};
const IconText = ({ icon, text }: Props) => {
    return (
        <div className="flex flex-col items-center gap-2 text-center text-sm">
            {icon && <div className={'w-12 [&_path]:fill-white'}>{icon}</div>}
            <p className="text-base">{text}</p>
        </div>
    );
};

export default IconText;
