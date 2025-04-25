import { CardsWithDecks } from '@/types/mtg';
import MTGCard from './MTGCard';

type Props = {
    cards: CardsWithDecks[];
    showDecks?: boolean;
    parentDelete?: () => void | null;
};
const CardList = ({ cards, showDecks = false, parentDelete }: Props) => {
    const handleDelete = (id) => {
        if (parentDelete) {
            parentDelete();
        }
    };
    return (
        <>
            {cards
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((card: CardsWithDecks) => (
                    <div key={`${card.id}`}>
                        <MTGCard
                            id={card.id}
                            imgUris={card.imgUris}
                            name={card.name}
                            oracleText={card.oracleText}
                            cardSuperType={card.cardSuperType}
                            cardType={card.cardType}
                            manaCost={card.manaCost}
                            power={card.power}
                            toughness={card.toughness}
                            backCardData={card.backCardData}
                            onDelete={() => handleDelete(card.id)}
                            decks={showDecks ? card.decks : []}
                        ></MTGCard>
                    </div>
                ))}
        </>
    );
};

export default CardList;
