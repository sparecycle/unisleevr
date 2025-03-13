import DeckModalContent from '@/Components/DeckModalContent';
import DeckTile from '@/Components/DeckTile';
import Input from '@/Components/Input';
import Modal from '@/Components/Modal';
import PageTitle from '@/Components/PageTitle';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Deck } from '@/types/deck';
import { useForm, usePage, router } from '@inertiajs/react';
import { FormEvent, useEffect, useState } from 'react';

type DecksProps = {
    decks: {
        data: Deck[];
        current_page: number;
        last_page: number;
        total: number;
    };
};

export default function Decks({ decks }: DecksProps) {
    const { auth } = usePage().props;
    const [isCreating, setIsCreating] = useState(false);
    const [activeDeck, setActiveDeck] = useState<null | Deck>(null);
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        user_id: auth.user.id, // Add user_id to form data
    });

    useEffect(() => {}, [decks]);

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('decks.store'), {
            onSuccess: () => {
                reset(); // Reset the form data
                setIsCreating(false); // Close the form on success
            },
            onError: (errors) => {
                console.error(errors); // Log errors to the console
            },
        });
    };

    const handleOnDelete = (id: number) => {
        // Send a DELETE request to the decks.destroy route
        router.delete(route('decks.destroy', id), {
            onSuccess: () => {
                console.log(`Deck ${id} deleted successfully`); // Log success message
            },
            onError: (errors) => {
                console.error(errors); // Log errors to the console
            },
        });
    };

    return (
        <AuthenticatedLayout header={<PageTitle>Decks</PageTitle>}>
            <div className="container mx-auto px-3 py-4">
                <div>
                    {!isCreating && (
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
                {isCreating && (
                    <div>
                        <form
                            onSubmit={onSubmit}
                            className="my-4 flex flex-col items-end justify-center gap-4"
                        >
                            <Input
                                type="text"
                                value={data.name}
                                placeholder="Name Your Deck"
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                            />
                            <div className={'inline-flex gap-4'}>
                                <button
                                    type="button"
                                    onClick={() => setIsCreating(false)}
                                    className={
                                        'btn bg-lg rounded-md border border-solid border-slate-600 px-3 py-2'
                                    }
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className={
                                        'btn bg-lg rounded-md border border-solid border-slate-600 px-3 py-2'
                                    }
                                    disabled={processing}
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
            <div className="container mx-auto px-3 py-4">
                {decks.data.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                        {decks.data.map((deck, idx) => (
                            <DeckTile
                                key={idx}
                                title={deck.name}
                                deck={deck}
                                activeSetter={setActiveDeck}
                                onDelete={() => handleOnDelete(deck.id)}
                            />
                        ))}
                    </div>
                ) : (
                    <div>No decks found.</div>
                )}
            </div>
            <Modal
                show={activeDeck !== null}
                onClose={() => setActiveDeck(null)}
            >
                {activeDeck && <DeckModalContent deck={activeDeck as Deck} />}
            </Modal>
        </AuthenticatedLayout>
    );
}
