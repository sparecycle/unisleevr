import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
    className?: string;
};
const SectionTitle = ({ children, className }: Props) => {
    return (
        <h2 className={`font-title text-2xl font-semibold uppercase ${className}`}>
            {children}
        </h2>
    );
};

export default SectionTitle;
