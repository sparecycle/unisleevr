import { CardDataType, CardWithDecksType, Deck } from '@/types/mtg';
import { router } from '@inertiajs/react';
import { Dispatch, SetStateAction } from 'react';

const deleteCard = (
    user_id: number,
    card: CardDataType | CardWithDecksType,
    parentSetter?: Dispatch<SetStateAction<boolean>>,
) => {
    const decks = ( card as CardWithDecksType ).decks || [];
    const updatedDecks = decks.map((deck: Deck) => ({
        id: deck.id,
        name: deck.name,
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

export default deleteCard;
