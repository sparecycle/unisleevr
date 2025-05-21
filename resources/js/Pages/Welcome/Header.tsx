import Hamburger from 'hamburger-react';
import { useState } from 'react';

const Header = () => {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <header className="sticky m-3 flex h-12 items-center justify-between rounded-md bg-black p-4 text-white">
            <div>header</div>
            <div className="flex h-8 w-8 items-center justify-center">
                <Hamburger size={20} toggled={open} toggle={setOpen} />
            </div>
        </header>
    );
};

export default Header;
