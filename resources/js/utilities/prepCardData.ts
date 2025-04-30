import { CardDataType, CardsWithDecks, Deck } from '../types/mtg';
import { splitStringByHyphen, turnManaCostIntoArray } from './general';

// currently an any because this takes the raw card data from scryfall.
export const prepCardDataForRender = (cardData: any[]): CardDataType[] | [] => {
    // Filter out cards that are not paper i.e. Arena only && tokens && art series
    // note: this might not be necessary if the scryfall search query is more specific
    const preFilteredCardData = filterNonPlayableCards(cardData);

    const output = preFilteredCardData.map((card: any) => {
        const isDoubleFaced = card.card_faces ? true : false;

        let parsedCardData;
        if (isDoubleFaced) {
            const frontFace = card.card_faces[0];
            const backFace = card.card_faces[1];
            const frontTypeLine = splitStringByHyphen(frontFace.type_line);
            const backTypeLine = splitStringByHyphen(backFace.type_line);

            parsedCardData = {
                id: card.id,
                name: frontFace.name,
                oracleText: frontFace.oracle_text,
                colorIdentity: card.color_identity,
                imgUris: frontFace.image_uris,
                manaCost: turnManaCostIntoArray(frontFace.mana_cost),
                cardSuperType: frontTypeLine[0],
                cardType: frontTypeLine[1],
                power: frontFace.power,
                backCardData: {
                    id: card.id,
                    imgUris: backFace.image_uris,
                    name: backFace.name,
                    cardSuperType: backTypeLine[0],
                    cardType: backTypeLine[1],
                    manaCost: turnManaCostIntoArray(backFace.mana_cost),
                    oracleText: backFace.oracle_text,
                    power: backFace.power,
                    toughness: backFace.toughness,
                },
            };
        } else {
            const typeLine = splitStringByHyphen(card.type_line);
            parsedCardData = {
                id: card.id,
                name: card.name,
                oracleText: card.oracle_text,
                colorIdentity: card.color_identity,
                imgUris: card.image_uris,
                manaCost: turnManaCostIntoArray(card.mana_cost),
                cardSuperType: typeLine[0],
                cardType: typeLine[1],
                power: card.power,
                toughness: card.toughness,
            };
        }

        return parsedCardData;
    });

    return output;
};

export const attachDeckRefsToParsedCards = (
    parsedCards: CardDataType[],
    decks: Deck[],
): CardsWithDecks[] => {
    return parsedCards.map((card) => {
        const deckRefs = decks?.filter((deck) => {
            return deck.cards.some((deckCard) => deckCard.id === card.id);
        });
        return {
            ...card,
            decks: deckRefs,
        };
    });
};

export const filterNonPlayableCards = (cards: unknown[]): unknown[] => {
    // Filter out cards that are not legal in any paper format
    const filteredCards = cards.filter(
        (card: any) =>
            // This is why we don't assume a data schema when we're working with 3rd party data. @nickzou wants to make content about this
            card.games.includes('paper') &&
            !card.layout.includes('token') &&
            !card.layout.includes('art_series') &&
            card.set_type !== 'memorabilia',
    );

    return filteredCards;
};
