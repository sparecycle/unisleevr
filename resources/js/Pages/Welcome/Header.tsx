import { Link } from '@inertiajs/react';
import { Slant as Hamburger } from 'hamburger-react';
import { useState } from 'react';

const Header = () => {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <>
            <header className="sticky m-3 flex h-12 items-center justify-between rounded-md bg-black text-white">
                <div className="grow p-4">logo</div>
                <div className="relative h-12 w-12 grow-0">
                    <Hamburger size={20} toggled={open} toggle={setOpen} />
                </div>
            </header>
            <div className="absolute left-0 top-[72px] mx-3 mb-3 h-[calc(100vh-84px)] w-[calc(100%-24px)] rounded-md bg-black p-4">
                <nav>
                    <ul>
                        <li className="text-white">
                            <Link href={route('decks.index')}>Decks</Link>
                        </li>
                        <li className="text-white">
                            <Link href={route('login')}>Login</Link>
                        </li>
                        <li className="text-white">menu item one</li>
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default Header;
