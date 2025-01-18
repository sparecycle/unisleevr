import Modal from '@/Components/Modal';
import MTGCard from '@/Components/MTGCard';
import Searchbar from '@/Components/Searchbar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { parseCardData } from '@/utility';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { CardDataType, rawCardDataType } from '../types/mtg';

export default function Dashboard({
    cards,
}: {
    cards: { data: rawCardDataType[] };
}) {
    console.log('10 straight raw cards from BE - ', cards);
    const [showModal, setShowModal] = useState(false);
    const [searchResults, setSearchResults] = useState<any>([]);
    const [cardsToDisplay, setCardsToDisplay] = useState<any>([]);

    const handleSearchResults = (results: any) => {
        if (results.length === 0) {
            setSearchResults([]);
            return;
        }
        if (results.length > 0) {
            setSearchResults(results);

            const parsedResults = searchResults.map(
                (card: rawCardDataType): CardDataType => {
                    return parseCardData(card);
                },
            );
            // we are using a different state to display the cards because we might apply filtering after the search results or paginate
            setCardsToDisplay(parsedResults);
        }
    };


    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="container mx-auto px-3 py-4">
                <Searchbar
                    autofocus={true}
                    parentSetter={handleSearchResults}
                />
                <div className="-mx-3 flex flex-wrap">
                    <div className="w-1/2 px-3 pb-3">
                        <button
                            className="btn w-full"
                            onClick={() => setShowModal(true)}
                        >
                            Import a list
                        </button>
                    </div>
                    <div className="w-1/2 px-3 pb-3">
                        <button className="btn w-full">Create a list</button>
                    </div>
                    <div className="w-1/2 px-3 pb-3">
                        <button className="btn w-full">Edit a list</button>
                    </div>
                    <div className="w-1/2 px-3 pb-3">
                        <button className="btn w-full">
                            View my shared cards
                        </button>
                    </div>
                    {cardsToDisplay.length > 0 && (
                        <div className="w-full px-3 pb-3">
                            <h2 className="text-lg font-semibold leading-tight text-gray-800 dark:text-gray-200">
                                Search Query
                            </h2>
                            <div className="flex w-full flex-wrap">
                                {cardsToDisplay.map((card: any) => (
                                    <div
                                        key={`${card.id}`}
                                        className="mb-2 w-full px-2 md:w-1/2 lg:w-1/4"
                                    >
                                        <MTGCard
                                            id={card.id}
                                            imgSrc={card.image_uris}
                                            name={card.name}
                                            oracle_text={card.oracle_text}
                                            cardSuperType={card.cardSuperType}
                                            cardType={card.cardType}
                                            manaCost={card.manaCost}
                                            power={card.power}
                                            toughness={card.toughness}
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
