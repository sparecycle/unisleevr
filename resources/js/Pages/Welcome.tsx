import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import Header from './Welcome/Header';
import Hero from './Welcome/Hero';
import Problem from './Welcome/Problem';

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    return (
        <>
            <Head title="Welcome" />
            <div className="relative flex min-h-screen w-full flex-col overflow-x-clip bg-zinc-900">
                <Header auth={auth} />
                <main>
                    <Hero />
                    <Problem />
                </main>

                <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                    Laravel v{laravelVersion} (PHP v{phpVersion})
                </footer>
            </div>
        </>
    );
}
