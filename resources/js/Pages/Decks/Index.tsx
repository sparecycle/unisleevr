import DeckModalContent from '@/Components/DeckModalContent';
import DeckTile from '@/Components/DeckTile';
import Modal from '@/Components/Modal';
import PageTitle from '@/Components/PageTitle';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Deck } from '@/types/mtg';
import { debounce } from '@/utility';
import { router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

type DecksProps = {
    decks: {
        data: Deck[];
        current_page: number;
        last_page: number;
        total: number;
    };
};

export default function Decks({ decks }: DecksProps) {
    console.log('decks', decks);
    const [isCreating, setIsCreating] = useState(false);
    const [activeDeck, setActiveDeck] = useState<null | Deck>(null);

    const deckRef = useRef<HTMLDivElement>(null);

    const handleScrollPast = (isIntersecting: boolean) => {
        alert(`isIntersecting: ${isIntersecting}`);
    };

    const debouncedHandleScrollPast = debounce(handleScrollPast, 100);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                debouncedHandleScrollPast(entry.isIntersecting);
            },
            {
                root: null, // Use the viewport as the root
                threshold: 0, // Trigger when the element is fully out of view
            },
        );

        if (deckRef.current) {
            observer.observe(deckRef.current);
        }

        return () => {
            if (deckRef.current) {
                observer.unobserve(deckRef.current);
            }
        };
    }, [debouncedHandleScrollPast]);

    const handleOnDelete = (id: number) => {
        router.delete(route('decks.destroy', id), {
            onSuccess: () => {
                console.log(`Deck ${id} deleted successfully`);
            },
            onError: (errors) => {
                console.error(errors);
            },
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
                    {decks.data.length > 0 && (
                        <button
                            onClick={() => {
                                setIsCreating(!isCreating);
                            }}
                            className={
                                'btn bg-lg rounded-md border border-solid border-slate-600 px-3 py-2'
                            }
                        >
                            Create a deck
                        </button>
                    )}
                </div>
            </div>
            <div className="container mx-auto px-3 py-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                    {decks.data.length > 0 && (
                        <>
                            {decks.data.map((deck, idx) => (
                                <DeckTile
                                    key={idx}
                                    title={deck.name}
                                    deck={deck}
                                    activeSetter={setActiveDeck}
                                    onDelete={() => handleOnDelete(deck.id)}
                                />
                            ))}
                        </>
                    )}
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
        </AuthenticatedLayout>
    );
}
