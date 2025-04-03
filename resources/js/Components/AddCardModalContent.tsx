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
    const [selectedCard, setSelectedCard] = useState<CardDataType>(
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
        //card:  selectedCard,
    });
    const handleCardSelect = (results: CardDataType[] | []) => {
        if (results === undefined || results.length == 0) return;
        setSelectedCard(results[0]);
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
            <div className="flex max-h-[30vh] w-full flex-wrap overflow-y-auto rounded-md border border-solid border-zinc-800 bg-zinc-900 p-2">

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
