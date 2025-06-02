import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const Section = ({ children }: Props) => {
    return <section>{children}</section>;
};

export default Section;
