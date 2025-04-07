import { mtgColors } from '@/constants';
import { Deck, DeckWithCommanders } from '@/types/deck';
import { Dispatch, SetStateAction } from 'react';
import { MdDeleteForever } from 'react-icons/md';

type DeckTileDeckFaceProps = {
    title: string;
    deck: DeckWithCommanders;
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
    console.log('DeckTileDeckFace', {
        title,
        deck,
        color_identity: deck.color_identity,
    });

    return (
        <div className="relative h-full w-full">
            <button
                className={`btn transition-rotate absolute right-1 top-1 z-10 rounded-full border-none bg-black/50 p-1 opacity-0 duration-200 ease-in-out group-hover/deck-tile:opacity-100`}
                onClick={handleOnDeleteClick}
                aria-label={`Delete ${title}`}
            >
                <MdDeleteForever size={25} />
            </button>
            <button
                className="deck-tile-header absolute left-0 top-0 z-0 flex h-full w-full items-center justify-center overflow-hidden rounded-md"
                onClick={() => activeSetter(deck)}
            >
                {deck.commanders?.length > 0 &&
                    deck.commanders.map((commander) => (
                        <div
                            key={`deck-commander-${commander.id}`}
                            className="align-center flex h-full w-full justify-center"
                        >
                            <img
                                className="h-full w-full object-cover transition-transform duration-200 group-hover/deck-tile:scale-110"
                                src={commander.imgUris.art_crop}
                                alt={commander.name}
                            />
                        </div>
                    ))}
            </button>
            <div
                className="deck-tile-body z-1 absolute bottom-0 left-0 flex h-auto w-full flex-wrap items-center justify-center rounded-b-md bg-zinc-900 p-0 pb-2 text-white shadow-md transition-transform duration-200 ease-in-out group-hover/deck-tile:bg-zinc-900/80"
                onClick={() => activeSetter(deck)}
            >
                <div className="color-divider flex h-[3px] w-full">
                    {deck.color_identity?.map((color) => (
                        <div
                            key={`deck-color-${color}`}
                            style={{
                                backgroundColor:
                                    mtgColors.hex[
                                        color as keyof typeof mtgColors.hex
                                    ],
                            }}
                            className="h-full w-full"
                        ></div>
                    ))}
                </div>
                <div className="w-full pt-1 text-center">
                    <h4 className="deck-tile-title hyphen-manual w-full text-wrap px-2 text-center font-bold">
                        {title}
                    </h4>
                </div>

                <h5 className="pb-1 text-center text-xs font-normal text-zinc-500 group-hover/deck-tile:text-white">
                    {deck.commanders?.length > 0 &&
                        deck.commanders.map((commander) => (
                            <div
                                key={`deck-commander-${commander.id}`}
                                className="w-full"
                            >
                                {commander.name}
                            </div>
                        ))}
                </h5>
            </div>
        </div>
    );
};

export default DeckTileDeckFace;
