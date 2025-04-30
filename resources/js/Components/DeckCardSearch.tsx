import { CardDataType } from '@/types/mtg';
import NametagButton from './NametagButton';
import Searchbar from './Searchbar';

type Props = {
    isSearching: boolean;
    parentSetter: (value: CardDataType[] | []) => void;
    cards: CardDataType[];
    processing: boolean;
    removeAction: (card: CardDataType) => void;
    searchingForCommanders: boolean;
};

const DeckCardSearch = ({
    isSearching,
    parentSetter,
    cards,
    processing,
    removeAction,
    searchingForCommanders,
}: Props) => {
    return (
        <>
            {isSearching && (
                <Searchbar
                    autofocus={false}
                    parentSetter={parentSetter}
                    specificCard
                    CTAText={
                        searchingForCommanders ? 'Add Commander' : 'Add Card'
                    }
                    placeholderText={
                        searchingForCommanders
                            ? 'Add commanders to your deck'
                            : 'Add cards to your deck'
                    }
                    cardsToExclude={cards}
                    searchingForCommanders={searchingForCommanders}
                ></Searchbar>
            )}

            {cards.length > 0 && (
                <>
                    <ul className="flex max-h-[30vh] w-full flex-wrap overflow-y-auto rounded-md border border-solid border-zinc-800 bg-zinc-900 p-2">
                        {cards.map((card) => (
                            <li key={`selectedcard-${card.id}`} className="m-1">
                                <NametagButton
                                    aria-label={`remove ${card.name} from deck`}
                                    disabled={processing || !isSearching}
                                    onClick={() => removeAction(card)}
                                    showClose={processing || isSearching}
                                >
                                    {card.name}
                                </NametagButton>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </>
    );
};

export default DeckCardSearch;
