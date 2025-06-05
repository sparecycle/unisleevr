import { ReactNode } from 'react';

type Props = {
    icon?: ReactNode;
    text: string;
};
const IconText = ({ icon, text }: Props) => {
    return (
        <div className="flex flex-col items-center gap-2 text-center text-sm">
            {icon && (
                <div
                    className={
                        'flex h-12 w-12 items-center justify-center [&_path]:fill-white [&_svg]:max-h-full [&_svg]:max-w-full'
                    }
                >
                    {icon}
                </div>
            )}
            <p className="text-base">{text}</p>
        </div>
    );
};

export default IconText;
