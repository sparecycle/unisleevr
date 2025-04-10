import { CardDataType, Deck } from '@/types/mtg';
import { useForm } from '@inertiajs/react';

const updateDeck = (deck: Deck, user_id: number, cards: CardDataType[]|[]) => {
    const {
        data,
        setData,
        patch,
        post,
        processing,
        clearErrors,
        reset,
        errors,
        setError,
        wasSuccessful,
        recentlySuccessful,
    } = useForm({
        name: deck.name,
        user_id: user_id,
        cards: cards,
    });

    patch(route('decks.update', deck?.id), {
        data, // Use the form state managed by useForm
        onSuccess: (e) => {
            console.log('deck updated!');
        },
        onError: (errors) => {
            console.error(errors); // Log errors to the console
        },
    });
};

export default updateDeck;
