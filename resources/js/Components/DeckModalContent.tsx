import { CardDataType, Deck, mtgColorStrings } from '@/types/mtg';
import { getColorIdentityFromCommanders } from '@/utilities/general';
import { useForm, usePage } from '@inertiajs/react';
import { FormEvent, useEffect, useState } from 'react';
import Button from './Button';
import DeckCardSearch from './DeckCardSearch';
import DeckCommanderSearch from './DeckCommanderSearch';
import Input from './Input';
import { useToast } from './Toast/ToastContext';

type DeckModalContentProps = {
    deck?: Deck;
    creating?: boolean;
    onClose: () => void;
    onDeckUpdated?: (updatedDeck: Deck) => void; // Add the callback prop
};

const DeckModalContent = ({
    deck,
    creating,
    onClose,
    onDeckUpdated, // Destructure the callback
}: DeckModalContentProps) => {
    const { openToast } = useToast();
    const { auth } = usePage().props;
    const [isEditing, setIsEditing] = useState(creating ?? false);
    const [disableSubmitButton, setDisableSubmitButton] = useState(false);
    const [selectedCards, setSelectedCards] = useState<CardDataType[]>(
        deck?.cards || [],
    );
    const [selectedCommanders, setSelectedCommanders] = useState<
        CardDataType[]
    >(deck?.commanders || []);
    const [isFormEdited, setIsFormEdited] = useState(false); // Track form edits
    const [namedByUser, setNamedByUser] = useState(deck?.name ?? false); // Track if the deck is named by the user
    const initialCommanderColorIdentity =
        getColorIdentityFromCommanders(selectedCommanders);
    const [currentColorIdentity, setCurrentColorIdentity] = useState<
        mtgColorStrings[]
    >(initialCommanderColorIdentity);

    useEffect(() => {
        const newCommanderColorIdentity =
            getColorIdentityFromCommanders(selectedCommanders);
        setCurrentColorIdentity(newCommanderColorIdentity);
    }, [selectedCommanders]);

    const {
        data,
        setData,
        patch,
        post,
        processing,
        clearErrors,
        reset,
        errors,
        setError,
        wasSuccessful,
        recentlySuccessful,
    } = useForm({
        name: deck?.name || undefined,
        user_id: auth.user.id,
        cards: selectedCards,
        commanders: selectedCommanders,
    });

    const isValidDeck = (deck: any): deck is Deck => {
        return (
            deck &&
            typeof deck.id === 'number' &&
            typeof deck.name === 'string' &&
            typeof deck.created_at === 'string' &&
            typeof deck.updated_at === 'string'
        );
    };

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

    const removeCard = (card: CardDataType) => {
        if (!isFormEdited) setIsFormEdited(true);
        const updatedCards = selectedCards.filter((c) => c.id !== card.id);
        setSelectedCards(updatedCards);
        setData('cards', updatedCards);
    };

    const removeCommander = (card: CardDataType) => {
        if (!isFormEdited) setIsFormEdited(true);
        const updatedCommanders = selectedCommanders.filter(
            (c) => c.id !== card.id,
        );
        setSelectedCommanders(updatedCommanders);
        setData('commanders', updatedCommanders);
    };

    useEffect(() => {
        const allUniqueColorsFromCards = Array.from(
            new Set(selectedCards.flatMap((card) => card.colorIdentity)),
        );
        const areAnyCardColorsInvalid = allUniqueColorsFromCards.some(
            (color) => !currentColorIdentity.includes(color),
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
        nameUnNamedDeckWithCommanders();
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

    const renderErrors = () => {
        if (!recentlySuccessful) {
            return (
                <p>
                    {errors.cards && (
                        <span className="text-red-500">{errors.cards}</span>
                    )}{' '}
                    {errors.commanders && (
                        <span className="text-red-500">
                            {errors.commanders}
                        </span>
                    )}
                </p>
            );
        }
        return null;
    };

    const closeForm = () => {
        reset();
        onClose();
    };

    const nameUnNamedDeckWithCommanders = () => {
        if (data.commanders.length > 0 && !namedByUser) {
            const commanderNames = data.commanders
                .map((commander: CardDataType) => commander.name)
                .join(' // ');

            const isDeckNamedAfterCommanders = data.name === commanderNames;

            if (!data.name) {
                setData('name', commanderNames);
            } else if (data.name && !isDeckNamedAfterCommanders) {
                setData('name', commanderNames);
            }
        }
    };

    const createDeck = (callback?: () => void) => {
        post(route('decks.store'), {
            data,
            preserveScroll: true, // Prevents the page from scrolling to the top
            onSuccess: (response) => {
                if (isValidDeck(response.props.updatedDeck)) {
                    if (onDeckUpdated) {
                        onDeckUpdated(response.props.updatedDeck);
                        openToast?.(
                            `Deck "${response.props.updatedDeck.name}" created`,
                            'info',
                        );
                    }
                    if (callback) {
                        callback();
                    }
                } else {
                    console.warn(
                        'Invalid or empty updatedDeck:',
                        response.props.updatedDeck,
                    );
                }
                closeForm();
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    const updateDeck = (callback?: () => void) => {
        patch(route('decks.update', deck?.id), {
            data,
            preserveScroll: true,
            onSuccess: (response) => {
                if (isValidDeck(response.props.updatedDeck)) {
                    if (onDeckUpdated) {
                        onDeckUpdated(response.props.updatedDeck);
                    }
                    openToast?.(
                        `Deck "${response.props.updatedDeck.name}" updated`,
                        'info',
                    );
                    if (callback) {
                        callback();
                    }
                } else {
                    console.warn(
                        'Invalid or empty updatedDeck:',
                        response.props.updatedDeck,
                    );
                }
                closeForm();
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    const onSubmit = async (e: FormEvent, callback?: () => void) => {
        e.preventDefault();
        await validate();
        if (errors.cards || errors.commanders) {
            console.log('Form has errors. Skipping submission.');
            return;
        }
        if (!isFormEdited) {
            console.log('Form has not been edited. Skipping submission.');
            closeForm();
            return;
        }
        if (creating) {
            createDeck(callback);
        } else if (!creating) {
            updateDeck(callback);
        }
    };

    return (
        <div className="flex h-full pt-2">
            <div className="flex w-full grow flex-col items-center gap-4 py-4">
                {renderErrors()}
                {isEditing ? (
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
                ) : (
                    <div>
                        {deck && deck.name && auth.user.id === deck.user_id ? (
                            <>{deck.name}</>
                        ) : (
                            <p className="text-zinc-500">
                                No deck selected or no permission to edit
                            </p>
                        )}
                    </div>
                )}
                <DeckCommanderSearch
                    isSearching={isEditing}
                    parentSetter={handleCommanderSelect}
                    commanders={selectedCommanders}
                    processing={processing}
                    removeAction={removeCommander}
                    commanderColorIdentity={currentColorIdentity}
                />
                {/* <DeckCardSearch
                    isSearching={isEditing}
                    parentSetter={handleCardSelect}
                    cards={selectedCards}
                    processing={processing}
                    removeAction={removeCard}
                    colorValidation={true}
                    commanderColorIdentity={currentColorIdentity}
                /> */}
                <div className="absolute bottom-4 shrink-0">
                    {creating ? (
                        <Button
                            onClick={(e) => {
                                e.preventDefault(); // Prevent default button behavior
                                onSubmit(e); // Trigger the form submission
                            }}
                            disabled={processing || disableSubmitButton}
                        >
                            Create Deck
                        </Button>
                    ) : (
                        <div className="flex items-center justify-center gap-2">
                            <Button
                                onClick={() => setIsEditing(!isEditing)}
                                disabled={processing}
                                className="border border-solid border-black bg-black px-3 py-2"
                            >
                                {!isEditing ? 'edit' : 'cancel'}
                            </Button>
                            {isEditing && (
                                <Button
                                    onClick={(e) => {
                                        e.preventDefault(); // Prevent default button behavior
                                        onSubmit(e); // Trigger the form submission
                                    }}
                                    disabled={processing || disableSubmitButton}
                                    className="border border-solid border-black bg-black px-3 py-2"
                                >
                                    Save
                                </Button>
                            )}
                            <Button
                                disabled={processing || disableSubmitButton}
                                onClick={(e) => {
                                    // TO DO : refactor to use link
                                    if (isEditing) {
                                        e.preventDefault(); // Prevent default navigation
                                        onSubmit(e, () => {
                                            window.location.href = `/decks/${deck?.id}`; // Navigate to the href
                                        }); // Wait for onSubmit to resolve
                                    } else {
                                        window.location.href = `/decks/${deck?.id}`; // Navigate to the href
                                    }
                                }}
                            >
                                deck details
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DeckModalContent;
