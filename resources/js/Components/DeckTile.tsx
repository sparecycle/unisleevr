import { Deck } from '@/types/deck';
import { Dispatch, SetStateAction } from 'react';
import DeckTileButtonContent from './DeckTileButtonFace';
import DeckTileDeckContent from './DeckTileDeckFace';

type DeckTileProps = {
    title: string;
    deck?: Deck;
    isButton?: boolean;
    buttonAction?: () => void;
    activeSetter?: Dispatch<SetStateAction<null | Deck>>;
    onDelete?: () => void;
};
const DeckTile = ({
    title,
    deck,
    activeSetter,
    onDelete,
    isButton,
    buttonAction,
}: DeckTileProps) => {
    return (
        <div className="group/deck-tile btn bg-lg relative flex aspect-[2.5/3] flex-col rounded-md border border-solid border-zinc-600 bg-zinc-200 hover:bg-zinc-300 focus:bg-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-zinc-400 dark:bg-zinc-950 dark:hover:bg-zinc-900 dark:focus:bg-zinc-900 dark:active:bg-zinc-800">
            {isButton && (
                <DeckTileButtonContent
                    title={title}
                    buttonAction={buttonAction}
                />
            )}
            {!isButton && (
                <DeckTileDeckContent
                    title={title}
                    deck={deck as Deck}
                    activeSetter={activeSetter}
                    onDelete={onDelete as () => void}
                />
            )}
        </div>
    );
};

export default DeckTile;
