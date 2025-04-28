import CardList from '@/Components/CardList';
import PageTitle from '@/Components/PageTitle';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Deck as DeckProps } from '@/types/deck';
import { CardDataType } from '@/types/mtg';
import updateDecks from '@/utilities/updateDecks';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

type Props = {
    deck: DeckProps;
};

export default function Deck({ deck }: Props) {
    const user = usePage().props.auth.user;
    const [submitting, setSubmitting] = useState(false);
    const handleDelete = (card:CardDataType) => {
        deck.cards = deck.cards.filter(c=>c.id !== card.name);
        updateDecks([deck], user.id, setSubmitting);
    }
    return (
        <AuthenticatedLayout header={<PageTitle>{deck.name}</PageTitle>}>
            <div className="container mx-auto px-3 py-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <CardList cards={deck.cards} parentDelete={handleDelete} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
