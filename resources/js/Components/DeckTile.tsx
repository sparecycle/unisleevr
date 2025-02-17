import { MdDeleteForever } from 'react-icons/md';
import { TbCardsFilled } from 'react-icons/tb';

type DeckTileProps = {
    title: string;
    onDelete: () => void;
    id: string;
};

const DeckTile = ({ title, onDelete, id }: DeckTileProps) => {
    const handleOnDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onDelete();
    };
    return (
        <div className="deck-tile group relative aspect-[2.5/3]">
            <button
                className={`btn transition-rotate absolute right-1 top-1 z-10 rounded-full border-none bg-black/50 p-1 opacity-0 duration-200 ease-in-out group-hover:opacity-100`}
                onClick={handleOnDeleteClick}
                aria-label={`Delete ${title}`}
            >
                <MdDeleteForever size={25} />
            </button>
            <a
                href={`deck/${id}`}
                className="card btn bg-lg flex h-full w-full flex-col rounded-md bg-zinc-200 hover:bg-zinc-300 focus:bg-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-100 focus:ring-offset-2 active:bg-zinc-400 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:focus:bg-zinc-700 dark:active:bg-zinc-600"
            >
                <div className="card-header flex h-3/4 w-full items-center justify-center rounded-t-md dark:bg-zinc-950 dark:text-zinc-200">
                    <TbCardsFilled size={'auto'} />
                </div>
                <div className="card-body flex h-1/4 w-full items-center justify-center">
                    <h4 className="card-title hyphen-manual w-full text-wrap px-2 text-center font-bold">
                        {title}
                    </h4>
                </div>
            </a>
        </div>
    );
};

export default DeckTile;
