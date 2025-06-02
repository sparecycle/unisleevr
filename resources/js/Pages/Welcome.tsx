import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import Header from './Welcome/Header';
import Hero from './Welcome/Hero';
import Problem from './Welcome/Problem';
import Solution from './Welcome/Solution';
import UseCase from './Welcome/UseCase';

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    return (
        <>
            <Head>
                <title>Welcome</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Genos:ital,wght@0,100..900;1,100..900&family=Oxanium:wght@200..800&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <div className="relative flex min-h-screen w-full flex-col overflow-x-clip bg-zinc-900">
                <Header auth={auth} />
                <main>
                    <Hero />
                    <Problem />
                    <Solution />
                    <UseCase />
                </main>

                <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                    Laravel v{laravelVersion} (PHP v{phpVersion})
                </footer>
            </div>
        </>
    );
}
