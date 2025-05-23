import { CardDataType, mtgColorStrings } from '@/types/mtg';
import CardList from './CardList';
import NametagButton from './NametagButton';
import Searchbar from './Searchbar';

type Props = {
    isSearching: boolean;
    parentSetter: (value: CardDataType[] | []) => void;
    commanders: CardDataType[];
    processing: boolean;
    removeAction: (card: CardDataType) => void;
    commanderColorIdentity: mtgColorStrings[];
    cardVisualization?: boolean;
};

const DeckCommanderSearch = ({
    isSearching,
    parentSetter,
    commanders,
    processing,
    removeAction,
    cardVisualization,
}: Props) => {
    return (
        <div className="relative z-0 flex w-full flex-col">
            {isSearching && (
                <div className="relative z-10 mb-2 w-full">
                    <Searchbar
                        autofocus={false}
                        parentSetter={parentSetter}
                        specificCard
                        CTAText={'Add Commander'}
                        placeholderText={'Add commanders to your deck'}
                        cardsToExclude={commanders}
                        partnerSearch={commanders.length > 0}
                    ></Searchbar>
                </div>
            )}

            {!cardVisualization && commanders.length > 0 && (
                <ul className="z-0 flex max-h-[30vh] min-h-[3.6rem] w-full flex-wrap overflow-y-auto rounded-md border border-solid border-zinc-800 bg-zinc-900 p-2">
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
            )}
            {cardVisualization && commanders.length > 0 && (
                <div className="z-0 grid w-full grid-cols-1 gap-4 overflow-y-auto rounded-md border border-solid border-zinc-800 bg-zinc-900 p-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
                    <CardList cards={commanders} parentDelete={removeAction} />
                </div>
            )}
        </div>
    );
};

export default DeckCommanderSearch;
