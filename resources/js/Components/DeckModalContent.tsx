import { Deck } from '@/types/deck';
import { useForm, usePage } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import { CardDataType } from '../types/mtg';
import Button from './Button';
import DeckCardSearch from './DeckCardSearch';
import Input from './Input';

type DeckModalContentProps = {
    deck?: Deck;
    creating?: boolean;
    onClose: () => void;
};
const DeckModalContent = ({
    deck,
    creating,
    onClose,
}: DeckModalContentProps) => {
    const { auth } = usePage().props;
    const [isEditing, setIsEditing] = useState(creating ?? false);
    const [updated, setUpdated] = useState<null | Deck>(null);
    const [selectedCards, setSelectedCards] = useState<CardDataType[]>(
        deck?.cards || [],
    );

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
    });

    const handleCardSelect = (results: CardDataType[] | []) => {
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
        // uniqueOutput.sort((a, b) => a.id - b.id);
        setSelectedCards(uniqueOutput);
        setData('cards', uniqueOutput); // Update cards in the form state
    };

    const removeCard = (card: CardDataType) => {
        const updatedCards =selectedCards.filter((c) => c.id !== card.id)
        setSelectedCards(updatedCards);
        setData('cards', updatedCards);
    };

    const validate = () => {
        if (!data.name) {
            setError('name', 'Name is required');
            return false;
        }
        if (data.cards.length === 0) {
            setError('cards', 'At least one card is required');
            return false;
        }
        clearErrors(); // Clear previous errors

        return true;
    };

    const renderErrors = () => {
        if (!recentlySuccessful) {
            return (
                <>
                    {errors.name && (
                        <p className="text-red-500">{errors.name}</p>
                    )}
                    {errors.cards && (
                        <p className="text-red-500">{errors.cards}</p>
                    )}
                </>
            );
        }
        return null;
    };

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (creating) {
            validate();

            post(route('decks.store'), {
                data, // Use the form state managed by useForm
                onSuccess: () => {
                    reset();
                    onClose();
                },
                onError: (errors) => {
                    console.error(errors);
                },
            });
        } else if (!creating) {
            validate();

            patch(route('decks.update', deck?.id), {
                data, // Use the form state managed by useForm
                onSuccess: (e) => {
                    setIsEditing(false); // Close the editing form on success
                    if (e.props.decks) {
                        setUpdated(
                            (e.props.decks as { data: Deck[] }).data.filter(
                                (d) => d.id === deck?.id,
                            )[0], // Update the deck data
                        );
                    }
                },
                onError: (errors) => {
                    console.error(errors); // Log errors to the console
                },
            });
        }
    };

    return (
        <div className="flex items-center justify-between pt-2">
            <div className="flex w-full grow flex-col items-center gap-4 py-4">
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
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                            />
                        </div>
                    </form>
                ) : (
                    <div>
                        {deck && deck.name && auth.user.id === deck.user_id ? (
                            <>{updated?.name ?? deck.name}</>
                        ) : (
                            <p className="text-zinc-500">
                                No deck selected or no permission to edit
                            </p>
                        )}
                    </div>
                )}
                <DeckCardSearch
                    isSearching={isEditing}
                    parentSetter={handleCardSelect}
                    cards={selectedCards}
                    processing={processing}
                    removeAction={removeCard}
                />
                <div className="shrink-0">
                    {creating ? (
                        <Button
                            onClick={(e) => {
                                e.preventDefault(); // Prevent default button behavior
                                onSubmit(e); // Trigger the form submission
                            }}
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
                                        console.log('from action');
                                        console.log(data);
                                        e.preventDefault(); // Prevent default button behavior
                                        onSubmit(e); // Trigger the form submission
                                    }}
                                    disabled={processing}
                                    className="border border-solid border-black bg-black px-3 py-2"
                                >
                                    Save
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DeckModalContent;
