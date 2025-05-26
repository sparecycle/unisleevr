import { CardDataType, mtgColorStrings } from '@/types/mtg';
import { useCallback } from 'react';
import CardList from './CardList';
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
    cardVisualization?: boolean;
};

const DeckCardSearch = ({
    isSearching,
    parentSetter,
    cards,
    processing,
    removeAction,
    colorValidation = false,
    commanderColorIdentity,
    cardVisualization = false,
}: Props) => {
    const validateCardColors = useCallback(() => {
        if (!colorValidation) return cards;
        return cards.map((card) => {
            const colorIdentityArray: mtgColorStrings[] = Array.isArray(
                card.colorIdentity,
            )
                ? card.colorIdentity
                : [];

            const isMissingCommanderColor =
                colorValidation &&
                !commanderColorIdentity.some((color) =>
                    colorIdentityArray.includes(color),
                );

            const isColorlessCard = colorIdentityArray.length === 0;

            const containsAnyInvalidColor =
                colorIdentityArray.some(
                    (color: mtgColorStrings) =>
                        !commanderColorIdentity.includes(color),
                ) ?? false;

            const isInvalidColor =
                isColorlessCard ||
                containsAnyInvalidColor ||
                (isMissingCommanderColor && !isColorlessCard);

            console.log(
                `Card: ${card.name}, isInvalidColor: ${isInvalidColor}, colorIdentity: ${colorIdentityArray}, commanderColorIdentity: ${commanderColorIdentity}`,
            );
            return { ...card, isInvalidColor };
        });
    }, [cards, commanderColorIdentity]);

    const cardsToDisplay = validateCardColors();
    console.log('cardsToDisplay', cardsToDisplay);
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

            {!cardVisualization && cardsToDisplay.length > 0 && (
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
            {cardVisualization && cards.length > 0 && (
                <div className="z-0 grid w-full grid-cols-1 gap-4 overflow-y-auto rounded-md border border-solid border-zinc-800 bg-zinc-900 p-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
                    <CardList
                        cards={cards}
                        parentDelete={removeAction}
                        deleteDisabled={processing || !isSearching}
                        invalidCards={cardsToDisplay.flatMap((card) =>
                            card.isInvalidColor ? [card.id] : [],
                        )}
                    />
                </div>
            )}
        </div>
    );
};

export default DeckCardSearch;
