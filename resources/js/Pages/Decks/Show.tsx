import CardList from '@/Components/CardList';
import PageTitle from '@/Components/PageTitle';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Deck as DeckProps } from '@/types/mtg';

type Props = {
    deck: DeckProps;
};

export default function Deck({ deck: { name, commanders, cards } }: Props) {
    return (
        <AuthenticatedLayout header={<PageTitle>{name}</PageTitle>}>
            <div className="container mx-auto px-3 py-4">
                <h2 className="text-lg font-semibold">Commanders</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <CardList cards={commanders} />
                </div>
                <h2 className="text-lg font-semibold">Cards</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <CardList cards={cards} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
