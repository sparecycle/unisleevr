import Searchbar from '@/Components/Searchbar';
import { Deck } from '@/types/deck';
import { useForm, usePage } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { CardDataType } from '../types/mtg';
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
    const [selectedCards, setSelectedCards] = useState<CardDataType[]>([]);

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
        console.log('uniqueOutput', uniqueOutput);
        setSelectedCards(uniqueOutput);
    };

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (creating) {
            post(route('decks.store'), {
                onSuccess: () => {
                    reset();
                    onClose();
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
                <div className="bg-zinc-900 px-4 py-6">
                    <button
                        onClick={onClose}
                        className="absolute right-0 top-0 p-2 text-2xl text-zinc-900 hover:text-zinc-100 focus:outline-none focus:ring-4 focus:ring-zinc-200 dark:text-zinc-200 dark:hover:text-zinc-500"
                    >
                        <IoIosClose />
                    </button>
                    <div className="flex items-center justify-between pt-2">
                        <div className="flex w-full grow flex-col items-center gap-4 py-4">
                            <form
                                onSubmit={onSubmit}
                                className="flex w-full flex-col items-center gap-4"
                            >
                                <div className="relative flex w-full flex-wrap">
                                    <Input
                                        type="text"
                                        value={data.name}
                                        placeholder="Name Your Deck"
                                        className="block w-full rounded-lg border border-zinc-300 bg-zinc-50 p-4 ps-10 text-sm text-zinc-900 focus:border-zinc-500 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white dark:placeholder-zinc-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                    />
                                    <div className={'inline-flex gap-4'}>
                                        <button
                                            type="submit"
                                            className={
                                                'absolute bottom-2.5 end-2.5 rounded-lg bg-zinc-700 px-4 py-2 text-sm font-medium text-white text-zinc-900 hover:bg-zinc-800 focus:outline-none focus:ring-4 focus:ring-zinc-200 dark:bg-blue-600 dark:bg-zinc-300 dark:hover:bg-zinc-400 dark:focus:ring-zinc-500'
                                            }
                                            disabled={processing}
                                        >
                                            Create Deck
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <Searchbar
                                autofocus={false}
                                parentSetter={handleCardSelect}
                                specificCard
                                CTAText="Add Card"
                                placeholderText="Add cards to your deck"
                            ></Searchbar>
                            {selectedCards.length > 0 && (
                                <>
                                    <ul className="flex max-h-[30vh] w-full flex-wrap overflow-y-auto rounded-md border border-solid border-zinc-800 bg-zinc-900 p-2">
                                        {selectedCards.map(
                                            (card: CardDataType) => (
                                                <li
                                                    key={`selectedcard-${card.id}`}
                                                    className="group/nametag m-1 rounded-md bg-zinc-800 px-2 py-1 group-hover/nametag:bg-zinc-700"
                                                >
                                                    <button
                                                        type="button"
                                                        aria-braillelabel={`remove ${card.name} from deck`}
                                                        className="flex items-center"
                                                        onClick={() =>
                                                            setSelectedCards(
                                                                selectedCards.filter(
                                                                    (c) =>
                                                                        c.id !==
                                                                        card.id,
                                                                ),
                                                            )
                                                        }
                                                    >
                                                        {card.name}
                                                        <IoIosClose className="opacity-0 transition-opacity duration-200 ease-in-out group-hover/nametag:opacity-100" />
                                                    </button>
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                </>
                            )}
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
                                        className="border border-solid border-black bg-white"
                                    />
                                    <Button className="border border-solid border-black bg-black px-3 py-2">
                                        Update
                                    </Button>
                                </form>
                            </div>
                        )}
                        <div className="shrink-0">
                            <Button
                                onClick={() => setIsEditingName(!isEditingName)}
                                className="border border-solid border-black bg-black px-3 py-2"
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
