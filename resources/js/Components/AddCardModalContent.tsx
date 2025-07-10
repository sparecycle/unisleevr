import { Deck } from '@/types/mtg';
import { CardDataType } from '@/types/mtg';
import updateDecks, { addCard } from '@/utilities/updateDecks';
import { usePage } from '@inertiajs/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useBreakpoint from 'use-breakpoint';
import Button from './Button';
import LabeledCheckbox from './LabeledCheckbox';
import MTGCard from './MTGCard';
import NametagButton from './NametagButton';
import Searchbar from './Searchbar';

type Props = {
    decks: Deck[];
    cardpool?: CardDataType[];
    modalClose?: Dispatch<SetStateAction<boolean>>;
};

const AddCardModalContent = ({ decks, cardpool, modalClose }: Props) => {
    const BREAKPOINTS = { sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536 };
    const { auth } = usePage().props;
    const [searchFocus, setSearchFocus] = useState<boolean>(true);
    const [selectedCard, setSelectedCard] = useState<CardDataType | null>(null);
    const [selectedDecks, setSelectedDecks] = useState<Deck[] | []>([]);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const { breakpoint, minWidth } = useBreakpoint(BREAKPOINTS);
    const handleCardSelect = (results: CardDataType[] | []) => {
        if (results === undefined || results.length == 0) return;
        setSelectedCard(results[0]);
        setSearchFocus(false);
    };
    useEffect(() => {
        if (submitted === true) {
            if (modalClose !== undefined) {
                modalClose(false);
            }
        }
    }, [submitted]);
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
            updateDecks({
                decks: selectedDecks,
                user_id: auth.user.id,
                cards: selectedDecks.map((deck) =>
                    addCard(deck, selectedCard as CardDataType),
                )[0],
                parentSetter: setSubmitted,
            });
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
                    <div className="grid-rows-auto grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div className="lg:col-start-1 lg:row-start-2 lg:border-none">
                            <div className="flex w-full flex-wrap overflow-y-auto rounded-md border border-solid border-zinc-800 bg-zinc-900 p-2">
                                {minWidth && minWidth > 768 && (
                                    <MTGCard
                                        id={selectedCard.id}
                                        imgUris={selectedCard.imgUris}
                                        name={selectedCard.name}
                                        oracleText={selectedCard.oracleText}
                                        cardSuperType={
                                            selectedCard.cardSuperType
                                        }
                                        cardType={selectedCard.cardType}
                                        manaCost={selectedCard.manaCost}
                                        power={selectedCard.power}
                                        toughness={selectedCard.toughness}
                                        backCardData={selectedCard.backCardData}
                                        onDelete={() => setSelectedCard(null)}
                                    ></MTGCard>
                                )}
                                {(breakpoint === null ||
                                    breakpoint === 'sm' ||
                                    breakpoint === 'md') && (
                                    <NametagButton
                                        aria-label={`tempo`}
                                        onClick={() => setSelectedCard(null)}
                                        showClose={true}
                                    >
                                        {selectedCard.name}
                                    </NametagButton>
                                )}
                            </div>
                        </div>
                        <div className="row-start-2 flex h-min w-full flex-wrap overflow-y-auto rounded-md bg-zinc-900 p-3 lg:col-span-2 lg:col-start-1 lg:row-start-1">
                            Please a select a deck to add this card to:
                        </div>
                        <div className="row-start-3 flex max-h-96 flex-col overflow-y-scroll md:max-h-106 lg:row-start-2">
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
                    <div className="flex items-center justify-center py-4">
                        <Button
                            onClick={onSubmit}
                            disabled={
                                selectedCard === null ||
                                selectedDecks.length === 0
                            }
                        >
                            Add Card
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default AddCardModalContent;
