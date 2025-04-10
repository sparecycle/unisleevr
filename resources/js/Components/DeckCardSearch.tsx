import { CardDataType } from '@/types/mtg';
import { IoIosClose } from 'react-icons/io';
import Searchbar from './Searchbar';

type Props = {
    isSearching: boolean;
    parentSetter: (value: CardDataType[] | []) => void;
    cards: CardDataType[];
    processing: boolean;
    removeAction: (card: CardDataType) => void;
};

const DeckCardSearch = ({
    isSearching,
    parentSetter,
    cards,
    processing,
    removeAction,
}: Props) => {
    return (
        <>
            {isSearching && (
                <Searchbar
                    autofocus={false}
                    parentSetter={parentSetter}
                    specificCard
                    CTAText="Add Card"
                    placeholderText="Add cards to your deck"
                ></Searchbar>
            )}

            {cards.length > 0 && (
                <>
                    <ul className="flex max-h-[30vh] w-full flex-wrap overflow-y-auto rounded-md border border-solid border-zinc-800 bg-zinc-900 p-2">
                        {cards.map((card) => (
                            <li
                                key={`selectedcard-${card.id}`}
                                className="group/nametag m-1 rounded-md bg-zinc-800 px-2 py-1 group-hover/nametag:bg-zinc-700"
                            >
                                <button
                                    type="button"
                                    aria-label={`remove ${card.name} from deck`}
                                    className="flex items-center"
                                    disabled={processing || !isSearching}
                                    onClick={() => removeAction(card)}
                                >
                                    {card.name}
                                    {processing ||
                                        (isSearching && (
                                            <IoIosClose className="opacity-0 transition-opacity duration-200 ease-in-out group-hover/nametag:opacity-100" />
                                        ))}
                                </button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </>
    );
};

export default DeckCardSearch;
