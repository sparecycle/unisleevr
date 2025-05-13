import ButtonShelf from '@/Components/ButtonShelf';
import DangerButton from '@/Components/DangerButton';
import DeckModalContent from '@/Components/DeckModalContent';
import DeckTile from '@/Components/DeckTile';
import Modal from '@/Components/Modal';
import PageTitle from '@/Components/PageTitle';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Deck, mtgColorStrings } from '@/types/mtg';
import { debounce, getColorIdentityFromCommanders } from '@/utilities/general';
import { router } from '@inertiajs/react';
import { useEffect, useMemo, useRef, useState } from 'react';

type pairedCommandersCategoryType = {
    type: string;
    cardIds: string[];
};

type DecksProps = {
    decks: {
        data: Deck[];
        current_page: number;
        last_page: number;
        total: number;
    };
    updatedDeck?: Deck; // Add updatedDeck to the props
    pairedCommanders: {
        allCards: any[];
        categories: pairedCommandersCategoryType[];
    };
};

export default function Decks({
    decks,
    updatedDeck,
    pairedCommanders,
}: DecksProps) {
    console.log('Updated deck data for decksToDisplay:', updatedDeck);
    console.log('Decks data:', decks.data);

    const setCachedPairedCommanders = () => {
        if (!localStorage.getItem('pairedCommanders')) {
            localStorage.setItem(
                'pairedCommanders',
                JSON.stringify(pairedCommanders),
            );
            return pairedCommanders;
        } else {
            return JSON.parse(localStorage.getItem('pairedCommanders') || '{}');
        }
    };

    const cachedPairedCommanders = setCachedPairedCommanders();

    console.log('Cached paired commanders:', cachedPairedCommanders);

    const decksWithColorIdentity = useMemo(() => {
        return decks.data.map((deck) => {
            const commanders = deck.commanders || [];
            const colorIdentity = getColorIdentityFromCommanders(
                commanders,
            ).filter((color): color is mtgColorStrings => color !== undefined);
            return { ...deck, color_identity: colorIdentity };
        });
    }, [decks.data]);
    const [deletingDeck, setDeletingDeck] = useState<null | Deck>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [activeDeck, setActiveDeck] = useState<null | Deck>(null);
    const [decksToDisplay, setDecksToDisplay] = useState<Deck[]>(
        decksWithColorIdentity,
    );
    console.log('decksToDisplay', decksToDisplay);

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
        setDeletingDeck(decksToDisplay.find((deck) => deck.id === id) || null);
    };

    const deleteDeck = (id: number) => {
        router.delete(route('decks.destroy', id), {
            preserveScroll: true,
            onSuccess: () => {
                console.log(`Deck ${id} deleted successfully`);
                setDecksToDisplay((prevDecks) =>
                    prevDecks.filter((deck) => deck.id !== id),
                );
                handleCloseModal();
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    const handleUpdateDeck = (updatedDeck: Deck) => {
        const colorIdentity = getColorIdentityFromCommanders(
            updatedDeck.commanders,
        ).filter((color): color is mtgColorStrings => color !== undefined);

        updatedDeck.color_identity = colorIdentity;

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
                // prepend the new deck if it doesn't exist
                console.warn(
                    `Deck with id ${updatedDeck.id} not found. Appending to decksToDisplay.`,
                );
                return [updatedDeck, ...prevDecks];
            }
        });
    };

    const handleCloseModal = () => {
        setActiveDeck(null);
        setIsCreating(false);
        setDeletingDeck(null);
        // Removed debugging console.log statement for production cleanliness.
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
                    {decksToDisplay.length === 0 && (
                        <div className="flex h-full w-full items-center justify-center">
                            <p className="text-center text-4xl font-bold">
                                You need decks to create a card pool.
                            </p>
                        </div>
                    )}
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
                        title={
                            decksToDisplay.length === 0
                                ? 'Start by creating a new deck!'
                                : 'Create a new deck'
                        }
                    />
                </div>
            </div>
            <Modal
                show={
                    activeDeck !== null || isCreating || deletingDeck !== null
                }
                dynamicHeight={deletingDeck !== null}
                onClose={() => handleCloseModal()}
            >
                {deletingDeck && (
                    <div className="flex h-full flex-col items-center justify-between">
                        <p className="mb-4 text-center text-lg">
                            Are you sure you want to delete "
                            <span className="font-semibold">
                                {deletingDeck.name}
                            </span>
                            "?
                        </p>
                        <div className="flex w-full justify-center gap-2">
                            <DangerButton
                                onClick={() => deleteDeck(deletingDeck.id)}
                            >
                                Delete
                            </DangerButton>
                            <SecondaryButton onClick={() => handleCloseModal()}>
                                Cancel
                            </SecondaryButton>
                        </div>
                    </div>
                )}
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
