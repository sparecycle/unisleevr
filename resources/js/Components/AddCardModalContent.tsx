import { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import Searchbar from "./Searchbar";
import { CardDataType } from "@/types/mtg";
import { FormEvent } from "react";

const AddCardModalContent = () => {
    const { auth } = usePage().props;
    const [selectedCards, setSelectedCards] = useState<CardDataType[]>(
        [],
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
        name:  undefined,
        user_id: auth.user.id,
        cards:  selectedCards,
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
        setSelectedCards(uniqueOutput);
        setData('cards', uniqueOutput);
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
    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

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
    };
    return (
        <div>
            <form
                onSubmit={onSubmit}
                className="flex w-full flex-col items-center gap-4"
            >
                <Searchbar autofocus={true} parentSetter={handleCardSelect}  />
            </form>
        </div>
    )
};

export default AddCardModalContent;
