import MTGCard from '@/Components/MTGCard';
import PageTitle from '@/Components/PageTitle';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { CardDataType } from '@/types/mtg';
import { parseCardData } from '@/utility';
import { Head } from '@inertiajs/react';

export default function Cards({
    cards,
    decks,
}: {
    cards: { data: rawCardDataType[] };
    decks: { data: any };
}) {
    // NOTE: this is rough scaffolding for the shard card pool page

    return (
        <AuthenticatedLayout header={<PageTitle>Shared Card Pool</PageTitle>}>
            <Head title="Card Pool" />

            <div className="container mx-auto px-3 py-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                   hello
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
