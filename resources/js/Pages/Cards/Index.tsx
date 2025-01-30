import MTGCard from '@/Components/MTGCard';
import PageTitle from '@/Components/PageTitle';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { CardDataType } from '@/types/mtg';
import { parseCardData } from '@/utility';
import { Head } from '@inertiajs/react';

export default function Cards({
    cards,
    decks,
}: {
    cards: { data: any };
    decks: { data: any };
}) {
    const parsedCards: CardDataType[] | [] = parseCardData(cards.data) || [];
    // NOTE: this is rough scaffolding for the shard card pool page
    console.log('decks', decks);
    console.log('parsedCards', parsedCards);

    return (
        <AuthenticatedLayout header={<PageTitle>Shared Card Pool</PageTitle>}>
            <Head title="Card Pool" />

            <div className="container mx-auto px-3 py-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {parsedCards.length > 1 &&
                        parsedCards.map((card: CardDataType) => (
                            <div key={`${card.id}`}>
                                <MTGCard
                                    id={card.id}
                                    imgUris={card.imgUris}
                                    name={card.name}
                                    oracleText={card.oracleText}
                                    cardSuperType={card.cardSuperType}
                                    cardType={card.cardType}
                                    manaCost={card.manaCost}
                                    power={card.power}
                                    toughness={card.toughness}
                                    backCardData={card.backCardData}
                                ></MTGCard>
                            </div>
                        ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
