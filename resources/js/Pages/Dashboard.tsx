import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
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
                        <button className="btn w-full">Import a list</button>
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
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
