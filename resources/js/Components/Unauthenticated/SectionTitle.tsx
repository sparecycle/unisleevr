import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};
const SectionTitle = ({ children }: Props) => {
    return <h2 className="font-title text-2xl font-semibold uppercase">{children}</h2>;
};

export default SectionTitle;
