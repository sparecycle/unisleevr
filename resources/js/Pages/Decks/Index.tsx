import ButtonShelf from '@/Components/ButtonShelf';
import DeckModalContent from '@/Components/DeckModalContent';
import DeckTile from '@/Components/DeckTile';
import Modal from '@/Components/Modal';
import PageTitle from '@/Components/PageTitle';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Deck } from '@/types/mtg';
import { debounce } from '@/utility';
import { router } from '@inertiajs/react';
import { useEffect, useMemo, useRef, useState } from 'react';

type DecksProps = {
    decks: {
        data: Deck[];
        current_page: number;
        last_page: number;
        total: number;
    };
    updatedDeck?: Deck; // Add updatedDeck to the props
};

export default function Decks({ decks, updatedDeck }: DecksProps) {
    console.log('Decks data:', decks);
    console.log('Updated deck data for decksToDisplay:', updatedDeck);
    const [isCreating, setIsCreating] = useState(false);
    const [activeDeck, setActiveDeck] = useState<null | Deck>(null);
    const [decksToDisplay, setDecksToDisplay] = useState<Deck[]>(decks.data);
    const [currentPage, setCurrentPage] = useState(decks.current_page);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const deckContainerRef = useRef<HTMLDivElement>(null);
    const targetTileRef = useRef<HTMLDivElement>(null);

    const handleScrollPast = async (isIntersecting: boolean) => {
        if (isIntersecting && !isLoadingMore && currentPage < decks.last_page) {
            console.log('Loading more decks...');
            setIsLoadingMore(true);

            try {
                // Make a direct API call to fetch the next page of decks
                const response = await fetch(`/decks?page=${currentPage + 1}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch decks');
                }

                const data = await response.json();

                // Update the state with the new decks
                const newDecks = data.decks.data;
                setDecksToDisplay((prevDecks) => [...prevDecks, ...newDecks]);
                setCurrentPage(data.decks.current_page);
            } catch (error) {
                console.error('Failed to load more decks:', error);
            } finally {
                setIsLoadingMore(false);
            }
        }
    };

    const debouncedHandleScrollPast = debounce(handleScrollPast, 50);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                debouncedHandleScrollPast(entry.isIntersecting);
            },
            {
                root: null, // Use the viewport as the root
                threshold: 0.5, // Trigger when the element is halfway into the view
            },
        );

        if (targetTileRef.current) {
            observer.observe(targetTileRef.current);
        }

        return () => {
            if (targetTileRef.current) {
                observer.unobserve(targetTileRef.current);
            }
        };
    }, [debouncedHandleScrollPast, decksToDisplay.length, currentPage]);

    const targetTileIndex = useMemo(() => {
        const columns = window.innerWidth < 768 ? 1 : 4; // Adjust based on screen size (e.g., 1 column for mobile, 4 for desktop)
        const rows = Math.ceil(decksToDisplay.length / columns);
        return Math.floor(rows * 0.75) * columns - 1; // 75% of the rows
    }, [decksToDisplay.length]);

    const handleOnDelete = (id: number) => {
        router.delete(route('decks.destroy', id), {
            preserveScroll: true, // Prevents the page from scrolling to the top
            onSuccess: () => {
                console.log(`Deck ${id} deleted successfully`);
                setDecksToDisplay((prevDecks) =>
                    prevDecks.filter((deck) => deck.id !== id),
                );
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    const handleUpdateDeck = (updatedDeck: Deck) => {
        console.log('Updating decksToDisplay data with:', updatedDeck); // Debugging log

        setDecksToDisplay((prevDecks) => {
            const deckExists = prevDecks.some(
                (deck) => deck.id === updatedDeck.id,
            );

            if (deckExists) {
                // Update the existing deck
                return prevDecks.map((deck) =>
                    deck.id === updatedDeck.id ? updatedDeck : deck,
                );
            } else {
                // Append the new deck if it doesn't exist
                console.warn(
                    `Deck with id ${updatedDeck.id} not found. Appending to decksToDisplay.`,
                );
                return [...prevDecks, updatedDeck];
            }
        });
    };


    const handleCloseModal = () => {
        setActiveDeck(null);
        setIsCreating(false);
    };

    return (
        <AuthenticatedLayout header={<PageTitle>Decks</PageTitle>}>
            <div className="container mx-auto px-3 py-4">
                <div>
                    {decksToDisplay.length > 0 && (
                        <ButtonShelf
                            buttons={[
                                {
                                    label: 'Create a deck',
                                    action: () => setIsCreating(true),
                                },
                            ]}
                        />
                    )}
                </div>
            </div>
            <div className="container mx-auto px-3 py-4" ref={deckContainerRef}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                    {decksToDisplay.length > 0 &&
                        decksToDisplay.map((deck, idx) => (
                            <DeckTile
                                key={`${idx}-${deck.id}`}
                                title={deck.name}
                                deck={deck}
                                activeSetter={setActiveDeck}
                                onDelete={() => handleOnDelete(deck.id)}
                                ref={
                                    idx === targetTileIndex
                                        ? targetTileRef
                                        : undefined
                                }
                            />
                        ))}
                    <DeckTile
                        isButton
                        buttonAction={() => setIsCreating(true)}
                        title="Create a new deck"
                    />
                </div>
            </div>
            <Modal
                show={activeDeck !== null || isCreating}
                onClose={() => handleCloseModal()}
            >
                {isCreating && (
                    <DeckModalContent
                        creating={isCreating}
                        onClose={handleCloseModal}
                        onDeckUpdated={handleUpdateDeck}
                    />
                )}
                {activeDeck && (
                    <DeckModalContent
                        deck={activeDeck as Deck}
                        creating={false}
                        onClose={handleCloseModal}
                        onDeckUpdated={handleUpdateDeck} // Pass the callback
                    />
                )}
            </Modal>
        </AuthenticatedLayout>
    );
}
