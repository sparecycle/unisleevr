import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
// import BottomCta from './Welcome/BottomCta';
import { usePage } from '@inertiajs/react';
import Header from '../Components/Header';
import Hero from './Welcome/Hero';
import Problem from './Welcome/Problem';
import Solution from './Welcome/Solution';
import UseCase from './Welcome/UseCase';

export default function Welcome({
    auth,
    unisleevrVersion,
}: PageProps<{
    laravelVersion: string;
    unisleevrVersion: string;
    phpVersion: string;
}>) {
    const user = usePage().props.auth.user;

    return (
        <>
            <Head>
                <title>Welcome</title>
            </Head>
            <div className="relative flex min-h-screen w-full flex-col overflow-x-clip bg-zinc-900">
                <Header auth={user} />
                <main>
                    <Hero />
                    <Problem />
                    <Solution />
                    <UseCase />
                    {/* <BottomCta /> */}
                </main>

                <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                    Unisleevr v{unisleevrVersion}
                </footer>
            </div>
        </>
    );
}
