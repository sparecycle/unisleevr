import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import Header from './Welcome/Header';

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    return (
        <>
            <Head title="Welcome" />
            <div className="relative flex min-h-screen flex-col bg-zinc-900">
                <Header auth={auth} />
                <main className=""></main>

                <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                    Laravel v{laravelVersion} (PHP v{phpVersion})
                </footer>
            </div>
        </>
    );
}
