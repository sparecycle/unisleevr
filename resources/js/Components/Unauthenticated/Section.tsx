import { ReactNode } from 'react';

type Props = {
    className?: string;
    children: ReactNode;
};

const Section = ({ className, children }: Props) => {
    return (
        <section className={`py-8 text-white ${className}`}>{children}</section>
    );
};

export default Section;
