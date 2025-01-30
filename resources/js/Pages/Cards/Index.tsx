import MTGCard from '@/Components/MTGCard';
import PageTitle from '@/Components/PageTitle';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { CardDataType, rawCardDataType } from '@/types/mtg';
import { parseCardData } from '@/utility';
import { Head } from '@inertiajs/react';

export default function Cards({
    cards,
}: {
    cards: { data: rawCardDataType[] };
}) {
    // NOTE: this is rough scaffolding for the shard card pool page

    let cardDataOuput: CardDataType[] = [];

    if (cards.data.length > 0) {
        cardDataOuput = cards.data.map(
            (card: rawCardDataType): CardDataType => {
                return parseCardData(card);
            },
        );
    }
    return (
        <AuthenticatedLayout header={<PageTitle>Shared Card Pool</PageTitle>}>
            <Head title="Card Pool" />

            <div className="container mx-auto px-3 py-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {cardDataOuput.map((card: CardDataType) => (
                        <MTGCard key={card.id} {...card} />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
