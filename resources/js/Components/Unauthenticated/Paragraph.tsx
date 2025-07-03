import { ComponentProps } from 'react';

type ParagraphType = ComponentProps<'p'>;

const Paragraph = ({ children, ...props }: ParagraphType) => {
    return (
        <p className="text-base md:text-lg" {...props}>
            {children}
        </p>
    );
};

export default Paragraph;
