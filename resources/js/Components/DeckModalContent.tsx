import { Deck } from "@/types/deck";
import { usePage, useForm } from "@inertiajs/react";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";

type DeckModalContentProps = {
    deck: Deck
};
const DeckModalContent = ({deck}:DeckModalContentProps) => {
    const {auth} = usePage().props;
    const [isEditingName, setIsEditingName] = useState(false);
    const { data, setData, patch, clearErrors, reset, errors } = useForm({
        name: deck.name,
    });
    return (

            <div className='py-6 px-4'>
                <div className="flex justify-between items-center">
                    {!isEditingName &&
                        <div>
                            {deck.name}
                        </div>
                    }
                    {isEditingName &&
                        <div className="grow pr-4">
                            <form className="flex items-center gap-4">
                                <Input value={data.name} />
                                <Button>Update</Button>
                            </form>
                        </div>
                    }
                    <div className="shrink-0">
                        <Button onClick={()=> setIsEditingName(!isEditingName)}
                        >{!isEditingName ? 'edit' : 'cancel'}</Button>
                    </div>
                </div>
            </div>
    )
};

export default DeckModalContent;
