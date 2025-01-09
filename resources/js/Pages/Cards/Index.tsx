import MTGCard from '@/Components/MTGCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Cards({ cards }: { cards: any }) {
    // NOTE: this is rough scaffolding for the shard card pool page
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Shared Card Pool
                </h2>
            }
        >
            <Head title="Card Pool" />

            <div className="container mx-auto px-3 py-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {cards.data.map((card : any) => (
                        <MTGCard key={card.id} {...card} />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
