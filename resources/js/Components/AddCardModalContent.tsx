import { Deck } from '@/types/deck';
import { CardDataType } from '@/types/mtg';
import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import LabeledCheckbox from './LabeledCheckbox';
import NametagButton from './NametagButton';
import Searchbar from './Searchbar';
import updateDeck from '@/utilities/updateDeck';

type Props = {
    decks: Deck[];
};

const AddCardModalContent = ({ decks }: Props) => {
    const { auth } = usePage().props;
    const [searchFocus, setSearchFocus] = useState<boolean>(true);
    const [selectedCard, setSelectedCard] = useState<CardDataType | null>(null);
    const [selectedDecks, setSelectedDecks] = useState<Deck[] | []>([]);
    const handleCardSelect = (results: CardDataType[] | []) => {
        if (results === undefined || results.length == 0) return;
        setSelectedCard(results[0]);
        setSearchFocus(false);
    };
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
    const onSubmit = () => {
        selectedDecks.forEach((deck) => {
            updateDeck(deck,auth.user.id, deck.cards);
        });
    };
    return (
        <div className="flex flex-col gap-2">
            <Searchbar
                autofocus={searchFocus}
                parentSetter={handleCardSelect}
                specificCard={true}
            />
            {selectedCard && (
                <>
                    <div className="flex max-h-[30vh] w-full flex-wrap overflow-y-auto rounded-md border border-solid border-zinc-800 bg-zinc-900 p-2">
                        <NametagButton aria-label={`tempo`} showClose={false}>
                            {selectedCard.name}
                        </NametagButton>
                    </div>
                    <div className="flex max-h-[30vh] w-full flex-wrap overflow-y-auto rounded-md bg-zinc-900 p-3">
                        Please a select a deck to add this card to:
                    </div>
                    <div className="flex flex-col flex-wrap">
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
                                    parentSetter={() => handleDeckSelect(deck)}
                                />
                            ))}
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
