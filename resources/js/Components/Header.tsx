import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import { User } from '@/types';
import { Link } from '@inertiajs/react';
import { Slant as Hamburger } from 'hamburger-react';
import { useState } from 'react';

type Props = {
    user: User | null;
};

const Header = ({ user }: Props) => {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <>
            <div className="sticky z-10 p-3">
                <div className="flex h-12 items-center justify-between rounded-md bg-zinc-900 p-3 text-white">
                    <nav className="flex h-full w-auto">
                        <Link
                            href="/"
                            className="h-full w-auto [&_polyline]:fill-none [&_polyline]:stroke-zinc-200"
                        >
                            <ApplicationLogo className="block h-full w-auto fill-current" />
                        </Link>
                        <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                            {user ? (
                                <>
                                    <NavLink
                                        href={route('decks.index')}
                                        active={route().current('decks.index')}
                                    >
                                        Decks
                                    </NavLink>
                                    <NavLink
                                        href={route('cards.index')}
                                        active={route().current('cards.index')}
                                    >
                                        Card Pool
                                    </NavLink>
                                </>
                            ) : (
                                <>
                                    <NavLink
                                        href={route('login')}
                                        active={route().current('login')}
                                    >
                                        Login
                                    </NavLink>
                                    <NavLink
                                        href={route('register')}
                                        active={route().current('register')}
                                    >
                                        Register
                                    </NavLink>
                                </>
                            )}
                        </div>
                    </nav>
                </div>

                <div className="relative h-12 w-12 grow-0 sm:hidden">
                    <Hamburger size={20} toggled={open} toggle={setOpen} />
                </div>
            </div>
            <div
                className={`absolute top-[72px] z-100 mx-3 mb-3 h-[calc(100vh-84px)] w-[calc(100%-24px)] rounded-md bg-black p-4 transition-[left] ${open ? 'left-0' : 'left-full'}`}
            >
                <nav>
                    <ul>
                        {user ? (
                            <>
                                <li className="text-white">
                                    <Link href={route('decks.index')}>
                                        Decks
                                    </Link>
                                </li>
                                <li className="text-white">
                                    <Link href={route('cards.index')}>
                                        Card Pool
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="text-white">
                                    <Link href={route('login')}>Login</Link>
                                </li>
                                <li className="text-white">
                                    <Link href={route('register')}>
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default Header;
