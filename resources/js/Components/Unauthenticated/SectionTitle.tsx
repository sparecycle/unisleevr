import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
    className?: string;
    eyebrow?: string;
};
const SectionTitle = ({ children, className, eyebrow }: Props) => {
    return (
        <hgroup>
            {eyebrow && (
                <div className="font-title border-l-2 border-solid border-l-rose-600 pl-2 text-base leading-tight font-medium text-white">
                    {eyebrow}
                </div>
            )}
            <h2
                className={`font-title text-[1.6rem] font-semibold uppercase ${className}`}
            >
                {children}
            </h2>
        </hgroup>
    );
};

export default SectionTitle;
