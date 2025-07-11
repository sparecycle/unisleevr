import AddCardModalContent from '@/Components/AddCardModalContent';
import ButtonShelf from '@/Components/ButtonShelf';
import CardList from '@/Components/CardList';
import Modal from '@/Components/Modal';
import PageTitle from '@/Components/PageTitle';
import RemoveCardModalContent from '@/Components/RemoveCardModalContent';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { CardDataType, CardWithDecksType, Deck } from '@/types/mtg';
import {
    attachDeckRefsToParsedCards,
    prepCardDataForRender,
} from '@/utilities/prepCardData';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Cards({ cards, decks }: { cards: any; decks: Deck[] }) {
    console.log('cards', { raw: cards, parsed: prepCardDataForRender(cards) });
    const parsedCards: CardDataType[] | [] = prepCardDataForRender(cards) || [];
    const [isAdding, setIsAdding] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);
    const [currentCard, setCurrentCard] = useState<
        CardWithDecksType | CardDataType | null
    >(null);

    const parsedCardsWithDeckRefs = attachDeckRefsToParsedCards(
        parsedCards,
        decks,
    );

    const addCard = () => {
        setIsAdding(true);
    };

    const handleClose = () => {
        if (isAdding) setIsAdding(false);
        if (isRemoving) setIsRemoving(false);
    };

    const buttons = [
        { label: 'Create a deck', link: '/decks/' },
        { label: 'Add a Card', action: addCard },
    ];

    const handleDelete = (card: CardWithDecksType | CardDataType) => {
        setIsRemoving(true);
        setCurrentCard(card);
    };

    return (
        <AuthenticatedLayout header={<PageTitle>Shared Card Pool</PageTitle>}>
            <Head title="Card Pool" />
            <div className="container mx-auto px-3 py-4">
                <div className="my-4">
                    <ButtonShelf buttons={buttons} />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
                    {parsedCardsWithDeckRefs.length > 0 &&
                        parsedCardsWithDeckRefs && (
                            <CardList
                                cards={parsedCardsWithDeckRefs}
                                showDecks={true}
                                parentDelete={handleDelete}
                            />
                        )}
                </div>
            </div>
            <Modal show={isAdding || isRemoving} onClose={handleClose}>
                {isAdding && (
                    <AddCardModalContent
                        decks={decks}
                        cardpool={cards}
                        modalClose={setIsAdding}
                    />
                )}
                {isRemoving && (
                    <RemoveCardModalContent
                        card={currentCard as CardWithDecksType}
                        modalClose={setIsRemoving}
                    />
                )}
            </Modal>
        </AuthenticatedLayout>
    );
}
