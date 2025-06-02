import { ReactNode } from 'react';

type Props = {
    className?: string;
    children: ReactNode;
};

const Section = ({ className, children }: Props) => {
    return (
        <section className={`py-14 text-white ${className}`}>
            <div className="container mx-auto flex flex-col gap-3 px-4">
                {children}
            </div>
        </section>
    );
};

export default Section;
