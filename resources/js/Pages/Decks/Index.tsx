import DeckTile from '@/Components/DeckTile';
import PageTitle from '@/Components/PageTitle';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';
import { FormEvent, useEffect, useState } from 'react';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import Modal from '@/Components/Modal';
import DeckModalContent from '@/Components/DeckModalContent';
import { Deck } from '@/types/deck';


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
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
    });

    useEffect(()=>{
    }, [decks]);

    const onSubmit = (e:FormEvent) => {
        e.preventDefault();
        post(route('decks.store'), { onSuccess: () => reset() });
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
                            <div
                                className={'inline-flex gap-4'}
                                onClick={() => {
                                    setIsCreating(false);
                                }}
                            >
                                <button
                                    className={
                                        'btn bg-lg rounded-md border border-solid border-slate-600 px-3 py-2'
                                    }
                                >
                                    Cancel
                                </button>
                                <button
                                    className={
                                        'btn bg-lg rounded-md border border-solid border-slate-600 px-3 py-2'
                                    }
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
            <div className="container mx-auto px-3 py-4 md:grid-cols-3 lg:grid-cols-5">
                {decks.data.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {decks.data.map((deck, idx) => <DeckTile key={idx} title={deck.name} deck={deck} activeSetter={setActiveDeck} /> )})
                    </div>
    ) : (
    <div>No decks found.</div>
    )}
    </div>
            <Modal show={activeDeck !== null} onClose={()=>setActiveDeck(null)}>
                {activeDeck && <DeckModalContent deck={activeDeck as Deck} />}
            </Modal>
        </AuthenticatedLayout>
    );
}
