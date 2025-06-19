import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};
const HeroTitle = ({ children }: Props) => {
    return (
        <h1 className="font-title text-3xl leading-10 font-semibold uppercase">
            {children}
        </h1>
    );
};

export default HeroTitle;
