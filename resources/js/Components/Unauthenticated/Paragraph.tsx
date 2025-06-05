import { ComponentProps } from 'react';

type ParagraphType = ComponentProps<'p'>;

const Paragraph = ({ children, ...props }: ParagraphType) => {
    return <p {...props}>{children}</p>;
};

export default Paragraph;
