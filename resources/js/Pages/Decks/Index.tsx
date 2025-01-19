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
                {!isCreating && <button onClick={()=> {
                        setIsCreating(!isCreating)
                    }} className={'btn bg-lg border border-solid rounded-md px-3 py-2 border-slate-600'}
                    >Create a deck</button>}
                </div>
                {isCreating &&

                    <div>
                        <form onSubmit={onSubmit}>
                            <input type="text" value={data.name} placeholder="Name Your Deck" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" onChange={e => setData('name', e.target.value)} />
                            <button>Create</button>
                        </form>
                    </div>
                }
            </div>
            <div className="container mx-auto px-3 py-4">
                {decks.data.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {decks.data.map((deck, idx) => <DeckTile key={idx} title={deck.name} /> )}
                    </div>
                ) : (
                    <div>No decks found.</div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
