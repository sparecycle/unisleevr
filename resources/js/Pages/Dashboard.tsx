import ButtonShelf from '@/Components/ButtonShelf';
import Modal from '@/Components/Modal';
import MTGCard from '@/Components/MTGCard';
import PageTitle from '@/Components/PageTitle';
import Searchbar from '@/Components/Searchbar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { CardDataType } from '../types/mtg';

// TO DO: remove cards from props and replace with decks
export default function Dashboard({ decks }: { decks: { data: any } }) {
    console.log('decks from BE', decks);
    const [showModal, setShowModal] = useState(false);
    const [searchResults, setSearchResults] = useState<CardDataType[]>([]);

    const handleSearchResults = (results: any) => {
        if (results.length === 0) {
            setSearchResults([]);
            return;
        }
        if (results.length > 0) {
            setSearchResults(results);
        }
    };
    console.log('searchResults', searchResults);

    return (
        <AuthenticatedLayout header={<PageTitle>Dashboard</PageTitle>}>
            <Head title="Dashboard" />

            <div className="container mx-auto px-3 py-4">
                <Searchbar
                    autofocus={true}
                    parentSetter={handleSearchResults}
                />
                <ButtonShelf
                    buttons={[
                        {
                            label: 'Import a list',
                            action: () => setShowModal(true),
                        },
                        {
                            label: 'Create a list',
                            action: () => console.log('create a list'),
                        },
                        {
                            label: 'Edit a list',
                            action: () => console.log('edit a list'),
                        },
                        { label: 'View my shared cards', link: '/cards' },
                    ]}
                />
                <div className="-mx-3 flex flex-wrap">
                    {searchResults.length > 0 && (
                        <div className="w-full px-3 pb-3">
                            <h2 className="text-lg font-semibold leading-tight text-gray-800 dark:text-gray-200">
                                Search Query
                            </h2>
                            <div className="flex w-full flex-wrap">
                                {searchResults.map((card: CardDataType) => (
                                    <div
                                        key={`${card.id}`}
                                        className="mb-2 w-full px-2 md:w-1/2 lg:w-1/4"
                                    >
                                        <MTGCard
                                            id={card.id}
                                            imgUris={card.imgUris}
                                            name={card.name}
                                            oracleText={card.oracleText}
                                            cardSuperType={card.cardSuperType}
                                            cardType={card.cardType}
                                            manaCost={card.manaCost}
                                            power={card.power}
                                            toughness={card.toughness}
                                            backCardData={card.backCardData}
                                        ></MTGCard>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <div className="w-full p-4">
                    <h2 className="text-lg font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Import a list
                    </h2>
                    <input type="file" className="mt-4" name="importFile" />
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
