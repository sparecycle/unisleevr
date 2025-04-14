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
};

export default function Decks({ decks }: DecksProps) {
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
        if (decksToDisplay.length < decks.total) {
            const fetchMissingDecks = async () => {
                try {
                    const response = await fetch(`/decks?page=${currentPage}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch missing decks');
                    }

                    const data = await response.json();
                    const missingDecks = data.decks.data;

                    // Append missing decks to decksToDisplay
                    setDecksToDisplay((prevDecks) => {
                        const existingIds = new Set(
                            prevDecks.map((deck) => deck.id),
                        );
                        const newDecks = missingDecks.filter(
                            (deck: Deck) => !existingIds.has(deck.id),
                        );
                        return [...prevDecks, ...newDecks];
                    });
                } catch (error) {
                    console.error('Failed to sync decks:', error);
                }
            };

            fetchMissingDecks();
        }
    }, [decksToDisplay.length, decks.total, currentPage]);

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

    const handleAddDeck = (newDeck: Deck) => {
        setDecksToDisplay((prevDecks) => [...prevDecks, newDeck]);
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
                                title={deck.name + ' - ' + (idx + 1)}
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
                        onDeckCreated={handleAddDeck}
                    />
                )}
                {activeDeck && (
                    <DeckModalContent
                        deck={activeDeck as Deck}
                        creating={false}
                        onClose={handleCloseModal}
                    />
                )}
            </Modal>
        </AuthenticatedLayout>
    );
}
