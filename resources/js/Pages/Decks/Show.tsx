import PageTitle from '@/Components/PageTitle';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Deck as DeckProps } from '@/types/mtg';
import Show from './Views/Show';

type Props = {
    deck: DeckProps;
};

export default function Deck({ deck }: Props) {
    return (
        <AuthenticatedLayout header={<PageTitle>{deck.name}</PageTitle>}>
            <Show deck={deck} />
        </AuthenticatedLayout>
    );
}
