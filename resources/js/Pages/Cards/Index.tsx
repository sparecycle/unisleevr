import ButtonShelf from '@/Components/ButtonShelf';
import MTGCard from '@/Components/MTGCard';
import PageTitle from '@/Components/PageTitle';

import AddCardModalContent from '@/Components/AddCardModalContent';
import Modal from '@/Components/Modal';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Deck } from '@/types/deck';
import { CardDataType } from '@/types/mtg';
import { parseCardData } from '@/utility';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

interface CardsWithDecks extends CardDataType {
    decks: Deck[] | undefined;
}

export default function Cards({
    cards,
    decks,
}: {
    cards: any;
    decks: Deck[] | undefined; // Update type from Deck[] | null to Deck[] | undefined
}) {
    console.log('cards', cards);
    const parsedCards: CardDataType[] | [] = parseCardData(cards) || [];
    console.log('cards', parsedCards);
    console.log('decks', decks);
    const [isAdding, setIsAdding] = useState(false);

    const parsedCardsWithDeckRefs = parsedCards.map((card) => {
        const deckRefs = decks?.filter((deck) => {
            return deck.cards.some((deckCard) => deckCard.id === card.id);
        });
        return {
            ...card,
            decks: deckRefs,
        };
    });

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
                    <AddCardModalContent />
                </Modal>
            )}
        </AuthenticatedLayout>
    );
}
