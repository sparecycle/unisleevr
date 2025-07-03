import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
    className?: string;
    eyebrow?: string;
};
const SectionTitle = ({ children, className, eyebrow }: Props) => {
    return (
        <hgroup className={`flex flex-col gap-y-1.5 lg:gap-y-4 ${className}`}>
            {eyebrow && (
                <div className="font-title border-l-2 border-solid border-l-rose-600 pl-2 text-base leading-3.5 font-medium text-white md:text-xl xl:text-2xl">
                    <p>{eyebrow}</p>
                </div>
            )}
            <h2
                className={`font-title text-[1.65rem] font-semibold uppercase md:text-4xl`}
            >
                {children}
            </h2>
        </hgroup>
    );
};

export default SectionTitle;
