import { Deck } from "@/types/deck";
import { usePage, useForm } from "@inertiajs/react";
import { FormEvent, useState } from "react";
import Input from "./Input";
import Button from "./Button";

type DeckModalContentProps = {
    deck: Deck
};
const DeckModalContent = ({deck}:DeckModalContentProps) => {
    const {auth} = usePage().props;
    const [isEditingName, setIsEditingName] = useState(false);
    const [updated, setUpdated] = useState<null | Deck>(null);
    const { data, setData, patch, clearErrors, reset, errors } = useForm({
        name: deck.name,
    });

    const onSubmit = (e:FormEvent) => {
        e.preventDefault();
        patch(route('decks.update', deck.id), {onSuccess: (e) => {
            setIsEditingName(false);
            setUpdated(e.props.decks.data.filter(d => d.id === deck.id)[0])
        }});
    }
    return (
        <>
            {deck.user_id === auth.user.id &&
                <div className='py-6 px-4'>
                    <div className="flex justify-between items-center">
                        {!isEditingName &&
                            <div>
                                {updated?.name ?? deck.name}
                            </div>
                        }
                        {isEditingName &&
                            <div className="grow pr-4">
                                <form onSubmit={onSubmit} className="flex items-center gap-4">
                                    <Input value={data.name} onChange={e=> setData('name', e.target.value)} />
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
            }
        </>
    )
};

export default DeckModalContent;
