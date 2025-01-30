import DeckTile from '@/Components/DeckTile';
import PageTitle from '@/Components/PageTitle';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';
import { FormEvent, useEffect, useState } from 'react';
import Button from '@/Components/Button';
import Input from '@/Components/Input';
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
}

export default function Decks({decks}:DecksProps) {
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
                {!isCreating && <Button onClick={()=> {
                        setIsCreating(!isCreating)
                    }}>Create a deck</Button>}
                </div>
                {isCreating &&
                    <div>
                        <form onSubmit={onSubmit} className='flex flex-col justify-center items-end gap-4 my-4'>
                            <Input type="text" value={data.name} placeholder="Name Your Deck" onChange={e => setData('name', e.target.value)} />
                            <div className={'inline-flex gap-4'} >
                                <button type='button' className={'btn bg-lg border border-solid rounded-md px-3 py-2 border-slate-600'}>Cancel</button>
                                <button type='submit' className={'btn bg-lg border border-solid rounded-md px-3 py-2 border-slate-600'}>Create</button>
                            </div>
                        </form>
                    </div>
                }
            </div>
            <div className="container mx-auto px-3 py-4">
                {decks.data.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {decks.data.map((deck, idx) => <DeckTile key={idx} deck={deck} title={deck.name} activeSetter={setActiveDeck} /> )}
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
