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
                        imgSrc='https://cards.scryfall.io/large/front/1/8/18a2bdc8-b705-4eb5-b3a5-ff2e2ab8f312.jpg?1626663778'
                        title='Wandering Archaic'
                        description='Whenever an opponent casts an instant or sorcery spell, they may pay {2}. If they don’t, you may copy that spell. You may choose new targets for the copy.'
                        colorIdentity='C'
                        cmc={5}
                        backCardData={
                            {
                                imgSrc:'https://cards.scryfall.io/large/back/1/8/18a2bdc8-b705-4eb5-b3a5-ff2e2ab8f312.jpg?1626663778',
                                title:'Explore the Vastlands',
                                description:'Each player looks at the top five cards of their library and may reveal a land card and/or an instant or sorcery card from among them. Each player puts the cards they revealed this way into their hand and the rest on the bottom of their library in a random order. Each player gains 3 life.',
                                colorIdentity:'C',
                                cmc:3
                            }
                        }
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
                        imgSrc='https://cards.scryfall.io/broken image.jpg?1584830914'
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
