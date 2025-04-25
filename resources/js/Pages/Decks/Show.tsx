import MTGCard from '@/Components/MTGCard';
import PageTitle from '@/Components/PageTitle';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Deck as DeckProps } from '@/types/deck';

type Props = {
    deck: DeckProps;
};

export default function Deck({ deck: { name, cards } }: Props) {
    return (
        <AuthenticatedLayout header={<PageTitle>{name}</PageTitle>}>
            <div className="container mx-auto px-3 py-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {cards.map((card, idx) => (
                        <div key={idx}>
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
                                decks={card.decks}
                            ></MTGCard>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
