import { CardDataType } from '@/types/mtg';
import { Dispatch, SetStateAction } from 'react';

type Props = {
    card: CardDataType;
    modalClose?: Dispatch<SetStateAction<boolean>>;
};

const RemoveCardModalContent = ({ card, modalClose }: Props) => {
    return <div className="flex flex-col gap-2">remove card</div>;
};

export default RemoveCardModalContent;
