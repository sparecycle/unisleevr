import { Deck } from '@/types/deck';
import { Dispatch, SetStateAction } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { TbCardsFilled } from 'react-icons/tb';

type DeckTileDeckFaceProps = {
    title: string;
    deck: Deck;
    activeSetter?: Dispatch<SetStateAction<null | Deck>>;
    onDelete: () => void;
};

const DeckTileDeckFace = ({
    title,
    deck,
    activeSetter,
    onDelete,
}: DeckTileDeckFaceProps) => {
    const handleOnDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onDelete();
    };

    return (
        <>
            <button
                className={`btn transition-rotate absolute right-1 top-1 z-10 rounded-full border-none bg-black/50 p-1 opacity-0 duration-200 ease-in-out group-hover/deck-tile:opacity-100`}
                onClick={handleOnDeleteClick}
                aria-label={`Delete ${title}`}
            >
                <MdDeleteForever size={25} />
            </button>
            <button
                className="deck-tile-header flex h-2/3 w-full items-center justify-center rounded-md"
                onClick={() => activeSetter(deck)}
            >
                <TbCardsFilled size={'auto'} />
            </button>
            <button
                className="deck-tile-body flex h-1/3 w-full items-center justify-center"
                onClick={() => activeSetter(deck)}
            >
                <h4 className="deck-tile-title hyphen-manual w-full text-wrap px-2 text-center font-bold">
                    {title}
                </h4>
            </button>
        </>
    );
};

export default DeckTileDeckFace;
