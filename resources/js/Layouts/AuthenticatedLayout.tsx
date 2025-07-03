import Header from '@/Components/Header';
import { ToastProvider } from '@/Components/Toast/Toast';
import { usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode } from 'react';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;

    return (
        <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900">
            <ToastProvider>
                <Header auth={user} />
                {header && (
                    <header className="bg-white dark:bg-zinc-800">
                        <div className="container mx-auto px-2 py-2 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}
                <main className="dark:text-white">{children}</main>
            </ToastProvider>
        </div>
    );
}
