import { CardsWithDecks, Deck } from '@/types/mtg';
import updateDecks from '@/utilities/updateDecks';
import { usePage } from '@inertiajs/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Button from './Button';
import LabeledCheckbox from './LabeledCheckbox';

type Props = {
    card: CardsWithDecks;
    modalClose?: Dispatch<SetStateAction<boolean>>;
};

const RemoveCardModalContent = ({ card, modalClose }: Props) => {
    const { auth } = usePage().props;
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [selectedDecks, setSelectedDecks] = useState<Deck[] | []>(
        card.decks as Deck[],
    );
    const handleCheckbox = (deck: Deck) => {
        const cardInDeck =
            deck.cards.filter((d) => d.id === card.id).length > 0;
        if (cardInDeck) {
            setSelectedDecks(selectedDecks.filter((d) => d.id !== deck.id));
        } else {
            setSelectedDecks([...selectedDecks, deck]);
        }
    };
    useEffect(() => {
        if (submitted === true) {
            if (modalClose !== undefined) {
                modalClose(false);
            }
        }
    }, [submitted]);
    const onSubmit = async () => {
        setSubmitting(true);
        try {
            updateDecks({
                decks: selectedDecks,
                user_id: auth.user.id,
                card: card as CardsWithDecks,
                parentSetter: setSubmitted,
                action: 'remove',
            });
        } catch (error) {
            console.error('One of the promises failed:', error);
        }
    };
    return (
        <div className="flex flex-col gap-2">
            <div>{card.name}</div>
            <div>
                {card.decks?.map((deck) => (
                    <LabeledCheckbox
                        initialState={true}
                        key={deck.id}
                        label={deck.name}
                        parentSetter={() => handleCheckbox(deck)}
                    />
                ))}
            </div>
            <div className="flex items-center justify-center">
                <Button onClick={onSubmit}>Remove Card</Button>
            </div>
        </div>
    );
};

export default RemoveCardModalContent;
