import { ReactNode } from 'react';

type Props = {
    className?: string;
    children: ReactNode;
};

const Section = ({ className, children }: Props) => {
    return (
        <section className={`py-16 text-white lg:py-24 xl:py-24 ${className}`}>
            <div className="container mx-auto flex flex-col gap-2 px-4">
                {children}
            </div>
        </section>
    );
};

export default Section;
