import {Slant as Hamburger} from 'hamburger-react';
import { useState } from 'react';

const Header = () => {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <>
            <header className="sticky m-3 flex h-12 items-center justify-between rounded-md bg-black p-4 text-white">
                <div>logo</div>
                <div className="flex h-8 w-8 items-center justify-center relative">
                    <Hamburger size={12} toggled={open} toggle={setOpen} />
                </div>
            </header>
            <div className="absolute left-0 top-[72px] mx-3 mb-3 h-[calc(100vh-84px)] w-[calc(100%-24px)] rounded-md bg-black p-4">
                <nav>
                    <ul>
                        <li className="text-white">menu item one</li>
                        <li className="text-white">menu item one</li>
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default Header;
