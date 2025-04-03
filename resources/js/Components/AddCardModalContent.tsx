import { useEffect, useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import Searchbar from "./Searchbar";
import { CardDataType } from "@/types/mtg";
import { FormEvent } from "react";
import { Deck } from "@/types/deck";

type Props = {
    decks: Deck[];
}

const AddCardModalContent = ({decks}:Props) => {
    const { auth } = usePage().props;
    const [selectedCards, setSelectedCards] = useState<CardDataType[]>(
        [],
    );
    console.log(decks);
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
    };
    //const validate = () => {
    //    if (!data.name) {
    //        setError('name', 'Name is required');
    //        return false;
    //    }
    //    if (data.cards.length === 0) {
    //        setError('cards', 'At least one card is required');
    //        return false;
    //    }
    //    clearErrors(); // Clear previous errors
    //
    //    return true;
    //};
    //const onSubmit = (e: FormEvent) => {
    //    e.preventDefault();
    //
    //    validate();
    //
    //    patch(route('decks.update', deck?.id), {
    //        data, // Use the form state managed by useForm
    //        onSuccess: (e) => {
    //            setIsEditing(false); // Close the editing form on success
    //            if (e.props.decks) {
    //                setUpdated(
    //                    (e.props.decks as { data: Deck[] }).data.filter(
    //                        (d) => d.id === deck?.id,
    //                    )[0], // Update the deck data
    //                );
    //            }
    //        },
    //        onError: (errors) => {
    //            console.error(errors); // Log errors to the console
    //        },
    //    });
    //};
    return (
        <div className="flex flex-col gap-2">
            <Searchbar autofocus={true} parentSetter={handleCardSelect} specificCard={true}  />
            <div className="flex">

            </div>
            <form
                //onSubmit={onSubmit}
                className="flex w-full flex-col items-center gap-4"
            >
            </form>
        </div>
    )
};

export default AddCardModalContent;
