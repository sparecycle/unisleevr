//<<<<<<< HEAD
import { Dispatch, SetStateAction } from "react";
import { Deck } from "@/types/deck";
import { TbCardsFilled } from 'react-icons/tb';
import { MdDeleteForever } from 'react-icons/md';

type DeckTileProps = {
 title: string;
 deck: Deck;
 activeSetter: Dispatch<SetStateAction<null | Deck>>;
    onDelete: () => void;
};
const DeckTile = ({title, deck, activeSetter, onDelete}:DeckTileProps) => {
    const handleOnDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onDelete();
    };
    return (
        <div className="group/deck-tile  relative btn bg-lg flex aspect-[2.5/3] flex-col rounded-md border border-solid border-zinc-600 bg-zinc-200 hover:bg-zinc-300 focus:bg-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-zinc-400 dark:bg-zinc-950 dark:hover:bg-zinc-900 dark:focus:bg-zinc-900 dark:active:bg-zinc-800" >
            <button
                className={`btn transition-rotate absolute right-1 top-1 z-10 rounded-full border-none bg-black/50 p-1 opacity-0 duration-200 ease-in-out group-hover/deck-tile:opacity-100`}
                onClick={handleOnDeleteClick}
                aria-label={`Delete ${title}`}
            >
                <MdDeleteForever size={25} />
            </button>
            <button className="deck-tile-header flex h-2/3 w-full items-center justify-center rounded-md" onClick={()=>activeSetter(deck)}>
                <TbCardsFilled size={'auto'} />
            </button>
            <button className="deck-tile-body flex h-1/3 w-full items-center justify-center" onClick={()=>activeSetter(deck)}>
                <h4 className="deck-tile-title hyphen-manual w-full text-wrap px-2 text-center font-bold">
                    {title}
                </h4>
            </button>
        </div>
    );
};

export default DeckTile;
