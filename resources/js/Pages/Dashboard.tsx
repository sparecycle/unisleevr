import Modal from '@/Components/Modal';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import MTGCard from '@/Components/MTGCard';


export default function Dashboard() {
    const [showModal, setShowModal] = useState(false);
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
                    <div className="w-1/4">
                    <p>Double sided card</p>
                    <MTGCard 
                        imgSrc='https://cards.scryfall.io/large/front/1/4/147bef05-4497-44d5-9dd6-fb5dc08e78f7.jpg?1584830914'
                        title='Goblin Gathering'
                        description='Create a number of 1/1 red Goblin creature tokens equal to two plus the number of cards named Goblin Gathering in your graveyard.'
                        colorIdentity='R'
                        cmc={4}
                    ></MTGCard>
                    </div>
                    <div className="w-1/4">
                    <p>standard card</p>
                    <MTGCard 
                        imgSrc='https://cards.scryfall.io/large/front/1/4/147bef05-4497-44d5-9dd6-fb5dc08e78f7.jpg?1584830914'
                        title='Goblin Gathering'
                        description='Create a number of 1/1 red Goblin creature tokens equal to two plus the number of cards named Goblin Gathering in your graveyard.'
                        colorIdentity='R'
                        cmc={4}
                    ></MTGCard>
                    </div>
                    <div className="w-1/4">
                    <p>card broken image</p>
                    <MTGCard 
                        imgSrc='https://cards.scryfall.io/large/front/1/4/147bef05-4497-44d5-9dd6-fb5dc08e78f7.jpg?1584830914'
                        title='Goblin Gathering'
                        description='Create a number of 1/1 red Goblin creature tokens equal to two plus the number of cards named Goblin Gathering in your graveyard.'
                        colorIdentity='R'
                        cmc={4}
                    ></MTGCard>
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
