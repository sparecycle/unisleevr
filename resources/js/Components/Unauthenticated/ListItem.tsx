import { ComponentProps } from 'react';

type ListItemProps = ComponentProps<'li'>;

const ListItem = ({ children, ...props }: ListItemProps) => {
    return (
        <li className="text-base md:text-lg" {...props}>
            {children}
        </li>
    );
};

export default ListItem;
