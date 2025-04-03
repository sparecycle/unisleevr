import { CardDataType } from '@/types/mtg';
import { Dispatch, SetStateAction } from 'react';
import NametagButton from './NametagButton';
import Searchbar from './Searchbar';

type Props = {
    isSearching: boolean;
    parentSetter: (value: CardDataType[] | []) => void;
    cards: CardDataType[];
    processing: boolean;
    removeAction: Dispatch<SetStateAction<CardDataType[]>>;
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
                            <li key={`selectedcard-${card.id}`} className="m-1">
                                <NametagButton
                                    aria-label={`remove ${card.name} from deck`}
                                    disabled={processing || !isSearching}
                                    onClick={() =>
                                        removeAction(
                                            cards.filter(
                                                (c) => c.id !== card.id,
                                            ),
                                        )
                                    }
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
