import { CardDataType, CardsWithDecks, Deck } from '@/types/mtg';
import { router } from '@inertiajs/react';
import { Dispatch, SetStateAction } from 'react';

type UpdateDecks = {
    decks: Deck[];
    user_id: number;
    card?: CardDataType | CardsWithDecks;
    commanders?: CardDataType | CardsWithDecks;
    parentSetter?: Dispatch<SetStateAction<boolean>>;
    action: 'add' | 'remove';
};

const updateDecks = (args: UpdateDecks) => {
    const { decks, user_id, card, parentSetter, action } = args;
    const add = (deck: Deck, card: CardDataType) => {
        return [...deck.cards, card];
    };
    const remove = (deck: Deck, card: CardDataType) => {
        return deck.cards.filter((c) => c.id !== card.id);
    };

    const actions = {
        add: add,
        remove: remove,
    };
    const updatedDecks = decks.map((deck) => ({
        id: deck.id,
        name: deck.name,
        cards: actions[action](deck, card),
        commanders: deck.commanders,
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
