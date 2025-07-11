import { useToast } from '@/Components/Toast/ToastContext';
import {
    CardDataType,
    CardWithDecksType,
    Deck as DeckProps,
    mtgColorStrings,
} from '@/types/mtg';
import { getColorIdentityFromCommanders } from '@/utilities/general';
import { useForm, usePage } from '@inertiajs/react';
import { FormEvent, useEffect, useState } from 'react';
import Button from '../../../Components/Button';
import DeckCardSearch from '../../../Components/DeckCardSearch';
import DeckCommanderSearch from '../../../Components/DeckCommanderSearch';
import Input from '../../../Components/Input';

import updateDecks, {
    removeCard,
    removeCommander,
} from '@/utilities/updateDecks';

type Props = {
    deck: DeckProps;
};

const Show = ({ deck }: Props) => {
    const user = usePage().props.auth.user;
    const { openToast } = useToast();
    const [isEditing, setIsEditing] = useState(false);
    const [disableSubmitButton, setDisableSubmitButton] = useState(false);
    const [selectedCards, setSelectedCards] = useState<CardDataType[]>(
        deck?.cards || [],
    );
    const [selectedCommanders, setSelectedCommanders] = useState<
        CardDataType[]
    >(deck?.commanders || []);
    const [isFormEdited, setIsFormEdited] = useState(false); // Track form edits
    const [namedByUser, setNamedByUser] = useState(Boolean(deck?.name)); // Track if the deck is named by the user
    const initialCommanderColorIdentity =
        getColorIdentityFromCommanders(selectedCommanders);
    const [currentColorIdentity, setCurrentColorIdentity] = useState<
        mtgColorStrings[]
    >(initialCommanderColorIdentity);

    const { data, setData, processing, clearErrors, reset, errors, setError } =
        useForm({
            name: deck?.name || undefined,
            user_id: user.id,
            cards: selectedCards,
            commanders: selectedCommanders,
        });

    useEffect(() => {
        const newCommanderColorIdentity =
            getColorIdentityFromCommanders(selectedCommanders);
        setCurrentColorIdentity(newCommanderColorIdentity);
    }, [selectedCommanders]);

    const handleCommanderSelect = (results: CardDataType[] | []) => {
        if (!isFormEdited) setIsFormEdited(true);
        if (results === undefined || results.length == 0) return;

        let uniqueOutput: CardDataType[] = [];

        if (selectedCommanders.length > 0) {
            uniqueOutput = [...selectedCommanders, ...results].filter(
                (item, index, self) =>
                    index === self.findIndex((t) => t.id === item.id),
            );
        } else {
            uniqueOutput = [...results];
        }
        setSelectedCommanders(uniqueOutput); // Update selectedCommanders instead of selectedCards
        setData('commanders', uniqueOutput); // Update commanders in the form state
    };

    const handleCardSelect = (results: CardDataType[] | []) => {
        if (!isFormEdited) setIsFormEdited(true);
        if (results === undefined || results.length == 0) return;

        let uniqueOutput: CardDataType[] = [];

        if (selectedCards.length > 0) {
            uniqueOutput = [...selectedCards, ...results].filter(
                (item, index, self) =>
                    index === self.findIndex((t) => t.id === item.id),
            );
        } else {
            uniqueOutput = [...results];
        }
        setSelectedCards(uniqueOutput);
        setData('cards', uniqueOutput); // Update cards in the form state
    };

    useEffect(() => {
        const allUniqueColorsFromCards = Array.from(
            new Set(selectedCards.flatMap((card) => card.colorIdentity)),
        );
        const areAnyCardColorsInvalid = allUniqueColorsFromCards.some(
            (color) => !currentColorIdentity.includes(color as mtgColorStrings),
        );
        const invalidColorIdentity =
            allUniqueColorsFromCards.length > 0
                ? areAnyCardColorsInvalid
                : false;

        if (
            invalidColorIdentity &&
            (isFormEdited || isEditing) &&
            selectedCards.length > 0
        ) {
            setError(
                'cards',
                "Selected cards do not match the deck's color identity",
            );
        } else {
            clearErrors('cards');
        }
    }, [selectedCards, currentColorIdentity, isEditing]);

    useEffect(() => {
        if (errors.cards || errors.commanders) {
            setDisableSubmitButton(true);
        } else {
            setDisableSubmitButton(false);
        }
    }, [errors]);

    const validate = () => {
        if (data.commanders.length === 0) {
            setError('commanders', 'At least one commander is required');
            return false;
        }
        if (data.commanders.length > 3) {
            setError('commanders', 'No more than three commanders are allowed');
            return false;
        }

        clearErrors(); // Clear previous errors

        return true;
    };

    const updateDeck = () => {
        updateDecks(
            {
                decks: [deck],
                user_id: user.id,
                commanders: selectedCommanders,
                cards: selectedCards,
                name: namedByUser ? data.name : deck.name,
            },
            () => {
                setIsEditing(false);
                openToast?.(`Deck "${deck.name}" updated`, 'info');
            },
        );
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const isValid = await validate();

        if (!isValid) {
            console.log('Form has errors. Skipping submission.');
            return;
        }
        if (!isFormEdited) {
            console.log('Form has not been edited. Skipping submission.');
            reset();
            setIsEditing(false);
            return;
        }
        updateDeck();
    };

    const handleCommanderDelete = (card: CardWithDecksType | CardDataType) => {
        if (selectedCommanders.length > 1) {
            if (!isFormEdited) setIsFormEdited(true);

            const updatedCommanders = selectedCommanders.filter(
                (c) => c.id !== card.id,
            );

            setSelectedCommanders(updatedCommanders);

            updateDecks({
                decks: [deck],
                user_id: user.id,
                commanders: removeCommander(deck, card),
            });
        } else {
            openToast('Deck needs at least one Commander.', 'error');
        }
    };
    const handleCardDelete = (card: CardWithDecksType | CardDataType) => {
        if (!isFormEdited) setIsFormEdited(true);

        const updatedCards = selectedCards.filter((c) => c.id !== card.id);

        setSelectedCards(updatedCards);

        updateDecks(
            {
                decks: [deck],
                user_id: user.id,
                cards: removeCard(deck, card),
            },
            () => {
                openToast?.(`"${card.name}" removed`, 'info');
            },
        );
    };
    return (
        <div className="container mx-auto flex pt-2">
            <div className="flex w-full grow flex-col items-center gap-4 py-4 pb-16">
                {isEditing && (
                    <form
                        onSubmit={onSubmit}
                        className="flex w-full flex-col items-center gap-4"
                    >
                        <div className="relative flex w-full flex-wrap">
                            <Input
                                type="text"
                                value={data.name || ''} // Ensure the input is always controlled
                                placeholder="Name Your Deck"
                                className="block w-full rounded-lg border border-zinc-300 bg-zinc-50 p-4 ps-10 text-sm text-zinc-900 focus:border-zinc-500 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white dark:placeholder-zinc-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                onChange={(e) => {
                                    if (!isFormEdited) setIsFormEdited(true);
                                    if (!namedByUser) setNamedByUser(true);
                                    setData('name', e.target.value);
                                }}
                            />
                        </div>
                    </form>
                )}
                <h2 className="text-lg font-semibold">Commanders</h2>
                {errors.commanders && (
                    <p className="text-red-500">{errors.commanders}</p>
                )}
                <div className="relative z-0 w-full pb-4">
                    <DeckCommanderSearch
                        isSearching={isEditing}
                        parentSetter={handleCommanderSelect}
                        commanders={selectedCommanders}
                        processing={processing}
                        removeAction={handleCommanderDelete}
                        commanderColorIdentity={currentColorIdentity}
                        cardVisualization={true}
                    />
                </div>

                <h2 className="text-lg font-semibold">Cards</h2>
                {errors.cards && <p className="text-red-500">{errors.cards}</p>}
                {selectedCommanders.length > 0 && (
                    <div className="relative z-0 w-full pb-4">
                        <DeckCardSearch
                            isSearching={isEditing}
                            parentSetter={handleCardSelect}
                            cards={selectedCards}
                            processing={processing}
                            removeAction={handleCardDelete}
                            colorValidation={selectedCommanders.length > 0}
                            cardVisualization={true}
                            commanderColorIdentity={currentColorIdentity}
                        />
                    </div>
                )}

                <div className="fixed bottom-0 z-10 w-full shrink-0 bg-zinc-900 py-4">
                    <div className="flex items-center justify-center gap-2">
                        {isEditing && (
                            <Button
                                onClick={(e) => {
                                    e.preventDefault(); // Prevent default button behavior
                                    onSubmit(e); // Trigger the form submission
                                }}
                                disabled={processing || disableSubmitButton}
                                className="border border-solid border-black bg-zinc-900 px-3 py-2"
                            >
                                Save Deck Changes
                            </Button>
                        )}
                        <Button
                            onClick={() => setIsEditing(!isEditing)}
                            disabled={processing}
                            className="border border-solid border-black bg-zinc-900 px-3 py-2"
                        >
                            {!isEditing ? 'Edit Deck' : 'Cancel'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Show;
