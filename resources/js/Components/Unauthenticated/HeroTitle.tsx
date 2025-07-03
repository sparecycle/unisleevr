import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};
const HeroTitle = ({ children }: Props) => {
    return (
        <h1 className="font-title text-3xl font-semibold tracking-tight uppercase md:text-5xl">
            {children}
        </h1>
    );
};

export default HeroTitle;
