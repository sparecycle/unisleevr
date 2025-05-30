import { ColorDivider } from '@/Components/ColorDivider';
import { CardDataType, Deck } from '@/types/mtg';
import { Dispatch, SetStateAction } from 'react';
import { MdDeleteForever } from 'react-icons/md';

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

    const maxTitleLength = 60;

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
                onClick={() => activeSetter && activeSetter(deck)}
            >
                {deck.commanders?.length === 2 ? (
                    <>
                        {/* First commander - top-left half */}
                        <div
                            className="absolute inset-0 overflow-hidden"
                            style={{
                                clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                            }}
                        >
                            <img
                                className="h-full w-full object-cover transition-transform duration-200 group-hover/deck-tile:scale-110"
                                src={deck.commanders[0].imgUris.art_crop}
                                alt={deck.commanders[0].name}
                            />
                        </div>

                        {/* Second commander - bottom-right half */}
                        <div
                            className="absolute inset-0 overflow-hidden"
                            style={{
                                clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
                            }}
                        >
                            <img
                                className="h-full w-full object-cover transition-transform duration-200 group-hover/deck-tile:scale-110"
                                src={deck.commanders[1].imgUris.art_crop}
                                alt={deck.commanders[1].name}
                            />
                        </div>

                        {/* Optional diagonal line - can be removed if not needed */}
                        <div
                            className="pointer-events-none absolute inset-0"
                            style={{
                                background:
                                    'linear-gradient(to right bottom, transparent calc(50% - 1px), rgba(255,255,255,0.7) calc(50%), transparent calc(50% + 1px))',
                            }}
                        />
                    </>
                ) : (
                    // Original code for one or more than two commanders
                    deck.commanders?.map((commander) => (
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
                    ))
                )}
            </button>
            <div
                className="deck-tile-body z-1 absolute bottom-0 left-0 flex h-auto w-full flex-wrap items-center justify-center rounded-b-md bg-zinc-900 p-0 pb-2 text-white shadow-md transition-transform duration-200 ease-in-out group-hover/deck-tile:bg-zinc-900/80"
                onClick={() => activeSetter && activeSetter(deck)}
            >
                <ColorDivider colorIdentity={deck.color_identity || []} />
                <div className="w-full pt-1 text-center">
                    <h4 className="deck-tile-title hyphen-manual w-full text-wrap px-2 text-center font-bold">
                        {title.length > maxTitleLength
                            ? `${title.slice(0, maxTitleLength)}...`
                            : title}
                    </h4>
                </div>

                <h5 className="pb-1 text-center text-xs font-normal text-zinc-500 group-hover/deck-tile:text-white">
                    {deck.commanders?.length > 0 &&
                        deck.commanders.map((commander: CardDataType) => (
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
