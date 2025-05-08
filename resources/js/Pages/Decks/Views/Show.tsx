import CardList from '@/Components/CardList';
import { CardDataType, CardsWithDecks, Deck as DeckProps} from '@/types/mtg';
import updateDecks from '@/utilities/updateDecks';
import { usePage } from '@inertiajs/react';
import { useToast } from '@/Components/Toast/ToastContext';

type Props = {
    deck: DeckProps;
};

const Show = ({ deck }: Props) => {
    const user = usePage().props.auth.user;
    const { openToast } = useToast();
    const handleCardDelete = (card: CardsWithDecks | CardDataType) => {
        if(deck.cards.length > 1) {
        updateDecks([deck], user.id, card, () => {}, 'remove');
        } else {
           openToast('Deck needs at least one card.', 'error');
        }
    };
    return (
        <div className="container mx-auto px-3 py-4">
            <h2 className="text-lg font-semibold">Commanders</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <CardList cards={deck.commanders} />
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
