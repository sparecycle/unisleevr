import { ReactNode } from 'react';

type Props = {
    className?: string;
    children: ReactNode;
    useBackground?: boolean;
    background?: ReactNode;
};

const Section = ({ className, children, useBackground, background }: Props) => {
    return (
        <section
            className={`relative py-16 text-white lg:py-24 xl:py-24 ${className}`}
        >
            <div className="container mx-auto flex flex-col gap-2 px-4">
                {children}
            </div>
            {useBackground && <>{background}</>}
        </section>
    );
};

export default Section;
