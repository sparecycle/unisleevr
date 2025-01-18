import PageTitle from '@/Components/PageTitle';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

type Deck = {
    id: number;
    name: string;
};

type DecksProps = {
    decks: Deck[];
}

export default function Decks({decks}:DecksProps) {
    return (
        <AuthenticatedLayout header={<PageTitle>Decks</PageTitle>}>
            <div className="container mx-auto px-3 py-4">
                <h3 className='text-lg'>Create a new deck</h3>
            </div>
            <div className="container mx-auto px-3 py-4">
            decks here
            </div>
        </AuthenticatedLayout>
    );
}
