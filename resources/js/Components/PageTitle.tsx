import { ReactNode } from "react";

type PageTitleProps = {
 children: ReactNode
};

const PageTitle = ({children}:PageTitleProps) => {
    return <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">{children}</h2>
};

export default PageTitle;
