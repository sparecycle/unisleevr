import ButtonShelf from '@/Components/ButtonShelf';
import MTGCard from '@/Components/MTGCard';
import PageTitle from '@/Components/PageTitle';

import AddCardModalContent from '@/Components/AddCardModalContent';
import Modal from '@/Components/Modal';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { CardDataType, CardsWithDecks, Deck } from '@/types/mtg';
import { attachDeckRefsToParsedCards, prepCardDataForRender } from '@/utility';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Cards({ cards, decks }: { cards: any; decks: Deck[] }) {
    console.log('cards', { raw: cards, parsed: prepCardDataForRender(cards) });
    const parsedCards: CardDataType[] | [] = prepCardDataForRender(cards) || [];
    const [isAdding, setIsAdding] = useState(false);

    const parsedCardsWithDeckRefs = attachDeckRefsToParsedCards(
        parsedCards,
        decks,
    );

    const addCard = () => {
        setIsAdding(true);
    };

    const buttons = [
        { label: 'Create a deck', link: '/decks/' },
        { label: 'Add a Card', action: addCard },
    ];

    const handleDelete = (id: string) => {
        alert(`delete card ${id}`);
    };

    return (
        <AuthenticatedLayout header={<PageTitle>Shared Card Pool</PageTitle>}>
            <Head title="Card Pool" />
            <div className="container mx-auto px-3 py-4">
                <div className="my-4">
                    <ButtonShelf buttons={buttons} />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {parsedCardsWithDeckRefs.length > 0 &&
                        parsedCardsWithDeckRefs.map((card: CardsWithDecks) => (
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
                                    onDelete={() => handleDelete(card.id)}
                                    decks={card.decks}
                                ></MTGCard>
                            </div>
                        ))}
                </div>
            </div>
            {isAdding && (
                <Modal show={true} onClose={() => setIsAdding(false)}>
                    <AddCardModalContent decks={decks} cardpool={cards} />
                </Modal>
            )}
        </AuthenticatedLayout>
    );
}
