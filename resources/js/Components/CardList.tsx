import { CardDataType, CardWithDecksType } from '@/types/mtg';
import { isCardWithDecks } from '@/utilities/general';
import MTGCard from './MTGCard';

type Props = {
    cards: CardWithDecksType[] | CardDataType[];
    showDecks?: boolean;
    parentDelete?: (card: CardDataType | CardWithDecksType) => void | null;
    deleteDisabled?: boolean;
    invalidCards?: string[];
};
const CardList = ({
    cards,
    showDecks = false,
    parentDelete,
    deleteDisabled,
    invalidCards,
}: Props) => {
    return (
        <>
            {cards
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((card) => (
                    <div
                        key={`${card.id}`}
                        className={
                            invalidCards?.includes(card.id)
                                ? 'rounded-mtg border border-2 border-red-800'
                                : ''
                        }
                    >
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
                            onDelete={
                                deleteDisabled &&
                                !invalidCards?.includes(card.id)
                                    ? undefined
                                    : () => {
                                          if (parentDelete) parentDelete(card);
                                      }
                            }
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
