import DeckTile from '@/Components/DeckTile';
import PageTitle from '@/Components/PageTitle';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

type Deck = {
    id: number;
    name: string;
};

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
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
    });

    const onSubmit = (e:FormEvent) => {
        e.preventDefault();
        post(route('decks.store'), { onSuccess: () => reset() });
    };
    return (
        <AuthenticatedLayout header={<PageTitle>Decks</PageTitle>}>
            <div className="container mx-auto px-3 py-4">
                <div>
                    <h3 className='text-lg'>Create a new deck</h3>
                    <button onClick={()=> {
                        setIsCreating(!isCreating)
                    }} className={'btn bg-slate-80'}
                    >{isCreating ? 'Cancel' : 'Create'}</button>
                </div>
                {isCreating &&

                    <div>
                        <form onSubmit={onSubmit}>
                            <input type="text" value={data.name} placeholder="Name Your Deck" className="text-black" onChange={e => setData('name', e.target.value)} />
                            <button>Create</button>
                        </form>
                    </div>
                }
            </div>
            <div className="container mx-auto px-3 py-4">
                {decks.data.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {decks.data.map(deck => <DeckTile title={deck.name} /> )}
                    </div>
                ) : (
                    <div>No decks found.</div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
