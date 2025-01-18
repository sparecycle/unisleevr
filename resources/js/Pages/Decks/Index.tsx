import DeckTile from '@/Components/DeckTile';
import PageTitle from '@/Components/PageTitle';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

type Deck = {
    id: number;
    name: string;
};

type DecksProps = {
    decks: {
        data: Deck[];
        current_page: number;
        last_page: number;
        total: number;
    };
}

export default function Decks({decks}:DecksProps) {
    return (
        <AuthenticatedLayout header={<PageTitle>Decks</PageTitle>}>
            <div className="container mx-auto px-3 py-4">
                <h3 className='text-lg'>Create a new deck</h3>
            </div>
            <div className="container mx-auto px-3 py-4">
                {decks.data.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {decks.data.map(deck => <DeckTile title={deck.name} /> )}
                    </div>
                ) : (
                    <div>No decks found.</div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
