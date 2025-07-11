import { ReactNode } from 'react';

type PageTitleProps = {
    children: ReactNode;
};

const PageTitle = ({ children }: PageTitleProps) => {
    return (
        <h2 className="text-xl leading-tight font-semibold text-zinc-800 dark:text-zinc-200">
            {children}
        </h2>
    );
};

export default PageTitle;
