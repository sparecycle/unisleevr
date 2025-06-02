import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};
const SectionTitle = ({ children }: Props) => {
    return <h2 className="text-xl">{children}</h2>;
};

export default SectionTitle;
