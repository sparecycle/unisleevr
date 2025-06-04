import { ReactNode } from 'react';

type Props = {
    className?: string;
    children: ReactNode;
};

const Section = ({ className, children }: Props) => {
    return (
        <section className={`py-16 text-white ${className}`}>
            <div className="container mx-auto flex flex-col gap-2 px-4">
                {children}
            </div>
        </section>
    );
};

export default Section;
