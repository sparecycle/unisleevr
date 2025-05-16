import { CardDataType, mtgColorStrings } from '@/types/mtg';
import { useCallback } from 'react';
import NametagButton from './NametagButton';
import Searchbar from './Searchbar';

type Props = {
    isSearching: boolean;
    parentSetter: (value: CardDataType[] | []) => void;
    cards: CardDataType[];
    processing: boolean;
    removeAction: (card: CardDataType) => void;
    colorValidation?: boolean;
    commanderColorIdentity: mtgColorStrings[];
};

const DeckCardSearch = ({
    isSearching,
    parentSetter,
    cards,
    processing,
    removeAction,
    colorValidation = false,
    commanderColorIdentity,
}: Props) => {
    const validateCardColors = useCallback(() => {
        if (!colorValidation) return cards;
        return cards.map((card) => {
            const isInvalidColor =
                colorValidation &&
                !commanderColorIdentity.some((color) =>
                    card.colorIdentity?.includes(color),
                ) &&
                card.colorIdentity !== undefined &&
                card.colorIdentity.length > 0;
            return { ...card, isInvalidColor };
        });
    }, [cards, commanderColorIdentity]);
    const cardsToDisplay = validateCardColors();
    return (
        <div className="relative z-0 flex w-full flex-col">
            {isSearching && (
                <div className="relative z-10 mb-2 w-full">
                    <Searchbar
                        autofocus={false}
                        parentSetter={parentSetter}
                        specificCard
                        CTAText={'Add Card'}
                        placeholderText={'Add cards to your deck'}
                        cardsToExclude={cards}
                        colors={commanderColorIdentity}
                        validateColor={colorValidation}
                    ></Searchbar>
                </div>
            )}

            {cardsToDisplay.length > 0 && (
                <ul className="z-0 flex max-h-[30vh] min-h-[3.6rem] w-full flex-wrap overflow-y-auto rounded-md border border-solid border-zinc-800 bg-zinc-900 p-2">
                    {cardsToDisplay.map((card) => {
                        return (
                            <li key={`selectedcard-${card.id}`} className="m-1">
                                <NametagButton
                                    aria-label={`remove ${card.name} from deck`}
                                    disabled={processing || !isSearching}
                                    onClick={() => removeAction(card)}
                                    showClose={processing || isSearching}
                                    invalid={card.isInvalidColor}
                                >
                                    {card.name}
                                </NametagButton>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default DeckCardSearch;
