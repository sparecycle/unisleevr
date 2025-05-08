import { CardDataType, CardsWithDecks, Deck } from '@/types/mtg';
import { router } from '@inertiajs/react';
import { Dispatch, SetStateAction } from 'react';

export const addCard = (deck: Deck, card: CardDataType | CardsWithDecks) => {
    return [...deck.cards, card];
};

export const removeRemove = (
    deck: Deck,
    card: CardDataType | CardsWithDecks,
) => {
    return deck.cards.filter((c) => c.id !== card.id);
};
type UpdateDecks = {
    decks: Deck[];
    user_id: number;
    cards?: CardDataType[] | undefined;
    commanders?: CardDataType[] | undefined;
    parentSetter?: Dispatch<SetStateAction<boolean>>;
};

const updateDecks = (args: UpdateDecks) => {
    const { decks, user_id, cards, commanders, parentSetter } = args;

    const updatedDecks = decks.map((deck) => ({
        id: deck.id,
        name: deck.name,
        cards: !!cards ? cards : deck.cards,
        commanders: !!commanders ? commanders : deck.commanders,
    }));
    router.put(
        route('decks.update-batch'),
        { user_id: user_id, decks: updatedDecks },
        {
            preserveState: true,
            only: [],
            onSuccess: () => {
                console.log(`Card added to decks`);
                if (parentSetter) {
                    parentSetter(true);
                }
            },
            onError: (errors) => {
                console.error(`Error update decks`, errors);
                if (parentSetter) {
                    parentSetter(false);
                }
            },
        },
    );
};

export default updateDecks;
