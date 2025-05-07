import CardList from '@/Components/CardList';
import PageTitle from '@/Components/PageTitle';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { CardDataType, CardsWithDecks, Deck as DeckProps } from '@/types/mtg';
import updateDecks from '@/utilities/updateDecks';
import { usePage } from '@inertiajs/react';

type Props = {
    deck: DeckProps;
};


export default function Deck({ deck }: Props) {
        const user = usePage().props.auth.user;
    const handleCardDelete=(card:CardsWithDecks | CardDataType)=> {
        console.log(deck)
        updateDecks([deck],user.id, card,()=>{}, 'remove');
    }
    return (
        <AuthenticatedLayout header={<PageTitle>{deck.name}</PageTitle>}>
            <div className="container mx-auto px-3 py-4">
                <h2 className="text-lg font-semibold">Commanders</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <CardList cards={deck.commanders} />
                </div>
                <h2 className="text-lg font-semibold">Cards</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <CardList cards={deck.cards} showDecks={false} parentDelete={handleCardDelete} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
