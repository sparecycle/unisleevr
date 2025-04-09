import ButtonShelf from '@/Components/ButtonShelf';
import DeckModalContent from '@/Components/DeckModalContent';
import DeckTile from '@/Components/DeckTile';
import Modal from '@/Components/Modal';
import MTGCard from '@/Components/MTGCard';
import PageTitle from '@/Components/PageTitle';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { CardDataType, CardsWithDecks, Deck } from '../types/mtg';
import { attachDeckRefsToParsedCards, prepCardDataForRender } from '../utility';

// TO DO: remove cards from props and replace with decks
export default function Dashboard({
    cards,
    decks,
}: {
    cards: any;
    decks: Deck[]; // Update type from Deck[] | null to Deck[] | undefined
}) {
    const [isCreatingDeck, setIsCreatingDeck] = useState(false);
    const [activeDeck, setActiveDeck] = useState<null | Deck>(null);
    const parsedCards: CardDataType[] | [] = prepCardDataForRender(cards) || [];
    // console.log('cards', { raw: cards, parsed: parsedCards });
    // console.log('decks', decks);
    const [showModal, setShowModal] = useState(false);
    const parsedCardsWithDeckRefs = attachDeckRefsToParsedCards(
        parsedCards,
        decks,
    );
    const handleDelete = (id: string) => {
        alert(`delete card ${id}`);
    };
    const handleCloseModal = () => {
        setActiveDeck(null);
        setIsCreatingDeck(false);
    };

    return (
        <AuthenticatedLayout header={<PageTitle>Dashboard</PageTitle>}>
            <Head title="Dashboard" />

            <div className="container mx-auto px-3 py-4">
                <ButtonShelf
                    buttons={[
                        {
                            label: 'Create a deck',
                            action: () => console.log('add a deck'),
                        },
                        {
                            label: 'Add a Card',
                            action: () => console.log('add a card'),
                        },
                    ]}
                />
                <h3>Your Decks</h3>
                <div className="container mx-auto px-3 py-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                        {decks.length > 0 && (
                            <>
                                {decks.map((deck, idx) => (
                                    <DeckTile
                                        key={idx}
                                        title={deck.name}
                                        deck={deck}
                                        activeSetter={setActiveDeck}
                                        onDelete={() =>
                                            handleDelete(`${deck.id}`)
                                        }
                                    />
                                ))}
                            </>
                        )}
                        <DeckTile
                            isButton
                            buttonAction={() => console.log('view all decks')}
                            title="View all Decks"
                        />
                    </div>
                </div>
            </div>
            <h3>Your Cardpool</h3>
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

            <Modal
                show={activeDeck !== null || isCreatingDeck}
                onClose={() => handleCloseModal()}
            >
                {isCreatingDeck && (
                    <DeckModalContent creating onClose={handleCloseModal} />
                )}
                {activeDeck && (
                    <DeckModalContent
                        deck={activeDeck as Deck}
                        creating={false}
                        onClose={handleCloseModal}
                    />
                )}
            </Modal>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <div className="w-full p-4">
                    <h2 className="text-lg font-semibold leading-tight text-zinc-800 dark:text-zinc-200">
                        Import a list
                    </h2>
                    <input type="file" className="mt-4" name="importFile" />
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
