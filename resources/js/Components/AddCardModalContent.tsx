import { Deck } from '@/types/deck';
import { CardDataType } from '@/types/mtg';
import updateDecks from '@/utilities/updateDecks';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import useBreakpoint from 'use-breakpoint';
import LabeledCheckbox from './LabeledCheckbox';
import NametagButton from './NametagButton';
import Searchbar from './Searchbar';

type Props = {
    decks: Deck[];
    cardpool?: CardDataType[];
};

const AddCardModalContent = ({ decks, cardpool }: Props) => {
    const BREAKPOINTS = { sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536 };
    const { auth } = usePage().props;
    const [searchFocus, setSearchFocus] = useState<boolean>(true);
    const [selectedCard, setSelectedCard] = useState<CardDataType | null>(null);
    const [selectedDecks, setSelectedDecks] = useState<Deck[] | []>([]);
    const [currentDeck, setCurrentDeck] = useState<Deck | null>(null);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const { maxWidth, minWidth } = useBreakpoint(BREAKPOINTS);
    const handleCardSelect = (results: CardDataType[] | []) => {
        if (results === undefined || results.length == 0) return;
        setSelectedCard(results[0]);
        setSearchFocus(false);
    };
    useEffect(() => {
        console.log(`max: ${maxWidth}`);
        console.log(`min: ${minWidth}`);
    });
    const handleDeckSelect = (deck: Deck) => {
        if (selectedDecks.length === 0) {
            setSelectedDecks([deck]);
        } else {
            const currentDeck = selectedDecks.filter((d) => d.id === deck.id);
            if (currentDeck.length === 0) {
                setSelectedDecks([...selectedDecks, deck]);
            } else {
                setSelectedDecks(selectedDecks.filter((d) => d.id != deck.id));
            }
        }
    };
    const onSubmit = async () => {
        setSubmitting(true);
        try {
            updateDecks(
                selectedDecks,
                auth.user.id,
                selectedCard as CardDataType,
                setSubmitted,
            );
        } catch (error) {
            console.error('One of the promises failed:', error);
        }
    };
    return (
        <div className="flex flex-col gap-2">
            <Searchbar
                autofocus={searchFocus}
                parentSetter={handleCardSelect}
                specificCard={true}
                cardsToExclude={cardpool}
            />
            {selectedCard && (
                <>
                    <div className="grid grid-cols-1 grid-rows-3 gap-4 lg:grid-cols-2 lg:grid-rows-2">
                        <div className="flex w-full flex-wrap overflow-y-auto rounded-md border border-solid border-zinc-800 bg-zinc-900 p-2 lg:col-start-1 lg:row-start-2 lg:border-none">
                            {minWidth && minWidth > 1024 && <>something</>}
                            {maxWidth && maxWidth < 1024 && (
                                <NametagButton
                                    aria-label={`tempo`}
                                    showClose={false}
                                >
                                    {selectedCard.name}
                                </NametagButton>
                            )}
                        </div>
                        <div className="row-start-2 flex w-full flex-wrap overflow-y-auto rounded-md bg-zinc-900 p-3 lg:col-span-2 lg:col-start-1 lg:row-start-1">
                            Please a select a deck to add this card to:
                        </div>
                        <div className="row-start-3 flex flex-col flex-wrap lg:row-start-2">
                            {decks &&
                                decks.map((deck) => (
                                    <LabeledCheckbox
                                        key={deck.id}
                                        label={deck.name}
                                        initialState={Boolean(
                                            selectedDecks !== null &&
                                                selectedDecks.find(
                                                    (d) => d.id === deck.id,
                                                ),
                                        )}
                                        parentSetter={() =>
                                            handleDeckSelect(deck)
                                        }
                                    />
                                ))}
                        </div>
                    </div>
                    <div>
                        <button onClick={onSubmit}>submit</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default AddCardModalContent;
