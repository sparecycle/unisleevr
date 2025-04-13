import { CardDataType, Deck } from '@/types/mtg';
import { router } from '@inertiajs/react';

const updateDeck = (deck: Deck, user_id: number, card: CardDataType) => {
    console.log(deck.name);
    const updatedCards = [...deck.cards, card];
    router.patch(
        route('decks.update', { deck: deck.id }),
        {
            name: deck.name,
            user_id: user_id,
            cards: updatedCards,
        },
        {
            preserveState: true,
            only: [],
            onSuccess: () => {
                console.log(`Card added to ${deck.name}`);
            },
            onError: (errors) => {
                console.error(`Error update deck ${deck.name}`, errors);
            },
        },
    );
};

export default updateDeck;
