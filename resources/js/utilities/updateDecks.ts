import { Deck } from '@/types/mtg';
import { router } from '@inertiajs/react';
import { Dispatch, SetStateAction } from 'react';

const updateDecks = (
    decks: Deck[],
    user_id: number,
    parentSetter?: Dispatch<SetStateAction<boolean>>,
) => {
    router.put(
        route('decks.update-batch'),
        { user_id: user_id, decks: decks },
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
