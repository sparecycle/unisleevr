import { CardDataType, Deck } from '@/types/mtg';
import { router } from '@inertiajs/react';

const updateDecks = (decks: Deck[], user_id: number, card: CardDataType) => {
    const updatedDecks = decks.map((deck) => ({
        id: deck.id,
        name: deck.name,
        cards: [...deck.cards, card],
    }));
    router.put(
        route('decks.update-batch'),
        { user_id: user_id, decks: updatedDecks },
        {
            preserveState: true,
            only: [],
            onSuccess: () => {
                console.log(`Card added to decks`);
            },
            onError: (errors) => {
                console.error(`Error update decks`, errors);
            },
        },
    );
};

export default updateDecks;
