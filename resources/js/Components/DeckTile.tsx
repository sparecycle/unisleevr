import { mtgColors } from '@/constants';
import { Deck } from '@/types/mtg';
import { Dispatch, forwardRef, RefObject, SetStateAction, useRef } from 'react';
import DeckTileButtonContent from './DeckTileButtonFace';
import DeckTileDeckContent from './DeckTileDeckFace';

type DeckTileProps = {
    title: string;
    deck?: Deck;
    isButton?: boolean;
    buttonAction?: () => void;
    activeSetter?: Dispatch<SetStateAction<null | Deck>>;
    onDelete?: () => void;
    ref?: RefObject<HTMLDivElement>;
};

const DeckTile = forwardRef<HTMLDivElement, DeckTileProps>(
    ({ title, deck, activeSetter, onDelete, isButton, buttonAction }, ref) => {
        const colorIdentity = deck?.color_identity || [];
        const getSequentialColor = (() => {
            let index = 0;
            return () => {
                if (colorIdentity.length === 0) return mtgColors.hex.C;
                const color =
                    mtgColors.hex[
                        colorIdentity[index] as keyof typeof mtgColors.hex
                    ] || mtgColors.hex.C;
                index = (index + 1) % colorIdentity.length;
                return color;
            };
        })();

        const getDarkenedColor = (color: string) => {
            const hex = color.replace('#', '');
            const r = Math.max(0, parseInt(hex.substring(0, 2), 16) - 150);
            const g = Math.max(0, parseInt(hex.substring(2, 4), 16) - 150);
            const b = Math.max(0, parseInt(hex.substring(4, 6), 16) - 150);
            return `rgb(${r}, ${g}, ${b})`;
        };

        const undercardsRef = useRef<HTMLDivElement[]>([]);

        const handleMouseEnter = () => {
            undercardsRef.current.forEach((card, index) => {
                if (card) {
                    card.style.transform = `translate(${index * -3}px, ${index * -2}px)`;
                }
            });
        };

        const handleMouseLeave = () => {
            undercardsRef.current.forEach((card) => {
                if (card) {
                    card.style.transform = `translate(0px, 0px)`;
                }
            });
        };

        const undercards = Array.from({ length: 5 });

        return (
            <div
                ref={ref}
                className="group/deck-tile btn relative flex aspect-[2.5/3] flex-col rounded-md"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="overcard absolute top-0 left-0 z-10 flex h-full w-full flex-col rounded-md bg-zinc-200 shadow-lg transition-transform duration-250 group-hover/deck-tile:z-20 group-hover/deck-tile:translate-x-[-15px] group-hover/deck-tile:translate-y-[-15px] focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden active:translate-x-[-5px] active:translate-y-[-5px] dark:bg-zinc-950 dark:group-hover/deck-tile:bg-zinc-900 dark:active:bg-zinc-800">
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
                <div className="undercard-wrapper absolute top-0 left-0 z-0 h-full w-full rounded-md opacity-50">
                    {undercards.map((_, index) => {
                        const color = getSequentialColor();
                        return (
                            <div
                                key={index}
                                ref={(el) =>
                                    (undercardsRef.current[index] = el!)
                                }
                                className="undercard absolute top-0 left-0 h-full w-full rounded-md border shadow-md transition-transform duration-250"
                                style={{
                                    background: `radial-gradient(circle, ${getDarkenedColor(
                                        color,
                                    )}, 50%, ${color})`,
                                    borderColor: `${getDarkenedColor(color)}`,
                                    transform: `translate(0px, 0px)`,
                                }}
                            ></div>
                        );
                    })}
                </div>
            </div>
        );
    },
);

export default DeckTile;
