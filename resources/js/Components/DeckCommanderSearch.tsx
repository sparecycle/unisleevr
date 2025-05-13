import { CardDataType, mtgColorStrings } from '@/types/mtg';
import NametagButton from './NametagButton';
import Searchbar from './Searchbar';

type Props = {
    isSearching: boolean;
    parentSetter: (value: CardDataType[] | []) => void;
    commanders: CardDataType[];
    processing: boolean;
    removeAction: (card: CardDataType) => void;
    commanderColorIdentity: mtgColorStrings[];
};

type CardDataTypeWithInvalidColor = CardDataType & {
    isInvalidColor: boolean;
};

const DeckCommanderSearch = ({
    isSearching,
    parentSetter,
    commanders,
    processing,
    removeAction,
    commanderColorIdentity,
}: Props) => {
    return (
        <>
            {isSearching && (
                <Searchbar
                    autofocus={false}
                    parentSetter={parentSetter}
                    specificCard
                    CTAText={'Add Commander'}
                    placeholderText={'Add commanders to your deck'}
                    cardsToExclude={commanders}
                    partenerSearch={commanders.length > 1}
                ></Searchbar>
            )}

            {commanders.length > 0 && (
                <>
                    <ul className="flex max-h-[30vh] w-full flex-wrap overflow-y-auto rounded-md border border-solid border-zinc-800 bg-zinc-900 p-2">
                        {commanders.map((commander) => {
                            return (
                                <li
                                    key={`selectedcard-${commander.id}`}
                                    className="m-1"
                                >
                                    <NametagButton
                                        aria-label={`remove ${commander.name} from deck`}
                                        disabled={processing || !isSearching}
                                        onClick={() => removeAction(commander)}
                                        showClose={processing || isSearching}
                                    >
                                        {commander.name}
                                    </NametagButton>
                                </li>
                            );
                        })}
                    </ul>
                </>
            )}
        </>
    );
};

export default DeckCommanderSearch;
