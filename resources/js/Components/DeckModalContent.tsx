import { Deck } from '@/types/deck';
import { useForm, usePage } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import Button from './Button';
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
    const [isEditingName, setIsEditingName] = useState(creating ?? false);
    const [updated, setUpdated] = useState<null | Deck>(null);
    const {
        data,
        setData,
        patch,
        post,
        processing,
        clearErrors,
        reset,
        errors,
    } = useForm({
        name: deck?.name || undefined,
        user_id: auth.user.id,
    });

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (creating) {
            post(route('decks.store'), {
                onSuccess: () => {
                    reset();
                    onClose();
                    // setIsCreating(false);
                },
                onError: (errors) => {
                    console.error(errors);
                },
            });
        }
        if (!creating) {
            patch(route('decks.update', deck?.id), {
                onSuccess: (e) => {
                    setIsEditingName(false); // Close the editing form on success
                    if (e.props.decks) {
                        setUpdated(
                            e.props.decks.data.filter(
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
    if (creating) {
        return (
            <>
                <div className="px-4 py-6">
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4"
                    >
                        X
                    </button>
                    <div className="flex items-center justify-between">
                        <div className="grow pr-4">
                            <form
                                onSubmit={onSubmit}
                                className="flex items-center gap-4"
                            >
                                <Input
                                    type="text"
                                    value={data.name}
                                    placeholder="Name Your Deck"
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                />
                                <div className={'inline-flex gap-4'}>
                                    <button
                                        type="submit"
                                        className={
                                            'btn bg-lg rounded-md border border-solid border-slate-600 px-3 py-2'
                                        }
                                        disabled={processing}
                                    >
                                        Create
                                    </button>
                                    <Button
                                        onClick={onClose}
                                        className="btn rounded-md border border-solid border-slate-600 bg-red-500 px-3 py-2"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    return (
        <>
            {deck && deck.user_id === auth.user.id && (
                <div className="px-4 py-6">
                    <div className="flex items-center justify-between">
                        {!isEditingName && (
                            <div>{updated?.name ?? deck.name}</div> // Display the deck name
                        )}
                        {isEditingName && (
                            <div className="grow pr-4">
                                <form
                                    onSubmit={onSubmit}
                                    className="flex items-center gap-4"
                                >
                                    <Input
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                    />
                                    <Button>Update</Button>
                                </form>
                            </div>
                        )}
                        <div className="shrink-0">
                            <Button
                                onClick={() => setIsEditingName(!isEditingName)}
                            >
                                {!isEditingName ? 'edit' : 'cancel'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DeckModalContent;
