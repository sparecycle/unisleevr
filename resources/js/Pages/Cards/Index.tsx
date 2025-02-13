import ButtonShelf from '@/Components/ButtonShelf';
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
    cards: any;
    decks: { data: any };
}) {
    const parsedCards: CardDataType[] | [] = parseCardData(cards) || [];
    console.log('parsedCards', parsedCards);
    console.log('decks', decks);

    const addCard = () => {
        console.log('add a card');
    };

    const buttons = [
        { label: 'Create a deck', link: '/decks/' },
        { label: 'Add a Card', action: addCard },
    ];

    return (
        <AuthenticatedLayout header={<PageTitle>Shared Card Pool</PageTitle>}>
            <Head title="Card Pool" />
            <div className="container mx-auto px-3 py-4">
                <div className="my-4">
                <ButtonShelf buttons={buttons} />
                </div>
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
