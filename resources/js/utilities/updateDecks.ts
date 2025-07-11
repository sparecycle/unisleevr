import { CardDataType, CardWithDecksType, Deck } from '@/types/mtg';
import { router } from '@inertiajs/react';
import { Dispatch, SetStateAction } from 'react';

export const addCard = (deck: Deck, card: CardDataType | CardWithDecksType) => {
    return [...deck.cards, card];
};

export const removeCard = (
    deck: Deck,
    card: CardDataType | CardWithDecksType,
) => {
    return deck.cards.filter((c) => c.id !== card.id);
};

export const addCommander = (
    deck: Deck,
    card: CardDataType | CardWithDecksType,
) => {
    return [...deck.commanders, card];
};

export const removeCommander = (
    deck: Deck,
    card: CardDataType | CardWithDecksType,
) => {
    return deck.commanders.filter((c) => c.id !== card.id);
};
type UpdateDecks = {
    decks: Deck[];
    user_id: number;
    cards?: CardDataType[] | undefined;
    commanders?: CardDataType[] | undefined;
    name?: string;
    parentSetter?: Dispatch<SetStateAction<boolean>>;
};

const updateDecks = (args: UpdateDecks, callBack?: () => void) => {
    const { decks, user_id, cards, commanders, parentSetter } = args;

    const updatedDecks = decks.map((deck) => ({
        id: deck.id,
        name: args.name || deck.name,
        cards: !!cards ? cards : deck.cards,
        commanders: !!commanders ? commanders : deck.commanders,
    }));
    console.log(updatedDecks);
    router.put(
        route('decks.update-batch'),
        // @ts-expect-error It's an object, who cares what kind of object
        { user_id: user_id, decks: updatedDecks },
        {
            preserveState: true,
            preserveScroll: true,
            only: [],
            onSuccess: () => {
                console.log(`Card updated to decks`);
                if (parentSetter) {
                    parentSetter(true);
                }
                if (callBack) {
                    callBack();
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
