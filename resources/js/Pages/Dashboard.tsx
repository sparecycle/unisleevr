import Modal from '@/Components/Modal';
import MTGCard from '@/Components/MTGCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { parseCardData } from '@/utility';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { CardDataType, rawCardDataType } from '../types/mtg';
import PageTitle from '@/Components/PageTitle';

export default function Dashboard({
    cards,
}: {
    cards: { data: rawCardDataType[] };
}) {
    const [showModal, setShowModal] = useState(false);
    let cardDataOuput: CardDataType[] = [];

    if (cards.data.length > 0) {
        cardDataOuput = cards.data.map(
            (card: rawCardDataType): CardDataType => {
                return parseCardData(card);
            },
        );
    }

    return (
        <AuthenticatedLayout
            header={
                <PageTitle>
                    Dashboard
                </PageTitle>
            }
        >
            <Head title="Dashboard" />

            <div className="container mx-auto px-3 py-4">
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
                    {/* this is all dummy content for testing and should be deleted eventually */}
                    <div className="flex w-full flex-wrap md:-mx-2">
                        {cardDataOuput &&
                            cardDataOuput.length > 0 &&
                            cardDataOuput.map((card: CardDataType) => (
                                <div
                                    key={`card.id-${card.name}`}
                                    className="mb-2 w-full px-2 md:w-1/2 lg:w-1/4"
                                >
                                    <MTGCard
                                        id={card.id}
                                        imgSrc={card.imgSrc}
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
