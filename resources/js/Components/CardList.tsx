import { CardDataType, CardWithDecks } from '@/types/mtg';
import { isCardWithDecks } from '@/utilities/general';
import MTGCard from './MTGCard';

type Props = {
    cards: CardWithDecks[] | CardDataType[];
    showDecks?: boolean;
    parentDelete?: (card: CardDataType | CardWithDecks) => void | null;
};
const CardList = ({ cards, showDecks = false, parentDelete }: Props) => {
    return (
        <>
            {cards
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((card) => (
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
                            onDelete={() => {
                                if (parentDelete) parentDelete(card);
                            }}
                            decks={
                                showDecks && isCardWithDecks(card)
                                    ? card.decks
                                    : []
                            }
                        ></MTGCard>
                    </div>
                ))}
        </>
    );
};

export default CardList;
