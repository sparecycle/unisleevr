import { CardsWithDecks } from '@/types/mtg';
import { Dispatch, SetStateAction } from 'react';
import LabeledCheckbox from './LabeledCheckbox';

type Props = {
    card: CardsWithDecks;
    modalClose?: Dispatch<SetStateAction<boolean>>;
};

const RemoveCardModalContent = ({ card, modalClose }: Props) => {
    return (
        <div className="flex flex-col gap-2">
            <div>{card.name}</div>
            <div>
                {card.decks?.map((deck) => (
                    <LabeledCheckbox initialState={true} key={deck.id} label={deck.name} />
                ))}
            </div>
        </div>
    );
};

export default RemoveCardModalContent;
