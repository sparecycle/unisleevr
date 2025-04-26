import {CardsWithDecks } from '@/types/mtg';
import { Dispatch, SetStateAction } from 'react';

type Props = {
    card: CardsWithDecks;
    modalClose?: Dispatch<SetStateAction<boolean>>;
};

const RemoveCardModalContent = ({ card, modalClose }: Props) => {
    return (
        <div className="flex flex-col gap-2">
            <div>{card.name}</div>
            <div></div>
        </div>
    );
};

export default RemoveCardModalContent;
