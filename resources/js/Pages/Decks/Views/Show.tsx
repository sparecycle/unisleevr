import CardList from '@/Components/CardList';
import { useToast } from '@/Components/Toast/ToastContext';
import { CardDataType, CardsWithDecks, Deck as DeckProps } from '@/types/mtg';
import updateDecks, {
    removeCard,
    removeCommander,
} from '@/utilities/updateDecks';
import { usePage } from '@inertiajs/react';

type Props = {
    deck: DeckProps;
};

const Show = ({ deck }: Props) => {
    const user = usePage().props.auth.user;
    const { openToast } = useToast();
    const handleCommanderDelete = (card: CardsWithDecks | CardDataType) => {
        if (deck.commanders.length > 1) {
            updateDecks({
                decks: [deck],
                user_id: user.id,
                commanders: removeCommander(deck, card),
            });
        } else {
            openToast('Deck needs at least one Commander.', 'error');
        }
    };
    const handleCardDelete = (card: CardsWithDecks | CardDataType) => {
        updateDecks({
            decks: [deck],
            user_id: user.id,
            cards: removeCard(deck, card),
        });
    };
    return (
        <div className="container mx-auto px-3 py-4">
            <h2 className="text-lg font-semibold">Commanders</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <CardList
                    cards={deck.commanders}
                    parentDelete={handleCommanderDelete}
                />
            </div>
            <h2 className="text-lg font-semibold">Cards</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <CardList
                    cards={deck.cards}
                    showDecks={false}
                    parentDelete={handleCardDelete}
                />
            </div>
        </div>
    );
};

export default Show;
