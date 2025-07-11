import {
    CardDataType,
    CardWithDecksType,
    Deck,
    ScryfallCard,
    mtgImgSrcType,
} from '../types/mtg';
import { splitStringByHyphen, turnManaCostIntoArray } from './general';

// currently an any because this takes the raw card data from scryfall.
export const prepCardDataForRender = (
    cardData: ScryfallCard[],
): CardDataType[] | [] => {
    // Filter out cards that are not paper i.e. Arena only && tokens && art series
    // note: this might not be necessary if the scryfall search query is more specific
    const preFilteredCardData = filterNonPlayableCards(cardData);

    const output = preFilteredCardData
        .filter((card: ScryfallCard) => {
            // For double-faced cards, ensure both faces have image_uris
            if (card.card_faces) {
                return (
                    card.card_faces[0]?.image_uris &&
                    card.card_faces[1]?.image_uris
                );
            }
            // For single-faced cards, ensure image_uris exists
            return !!card.image_uris;
        })
        .map((card: ScryfallCard) => {
            let parsedCardData;
            if (card.card_faces) {
                const frontFace = card.card_faces[0];
                const backFace = card.card_faces[1];
                const frontTypeLine = splitStringByHyphen(frontFace.type_line);
                const backTypeLine = splitStringByHyphen(backFace.type_line);

                parsedCardData = {
                    id: card.id,
                    name: frontFace.name,
                    oracleText: frontFace.oracle_text as string,
                    colorIdentity: card.color_identity as unknown as string,
                    imgUris: (frontFace.image_uris ||
                        {}) as unknown as mtgImgSrcType,
                    manaCost: turnManaCostIntoArray(
                        frontFace.mana_cost as string,
                    ),
                    cardSuperType: frontTypeLine[0],
                    cardType: frontTypeLine[1],
                    power: frontFace.power as string | undefined,
                    toughness: frontFace.toughness as string | undefined,
                    backCardData: {
                        id: card.id,
                        imgUris: (backFace.image_uris ||
                            {}) as unknown as mtgImgSrcType,
                        name: backFace.name,
                        cardSuperType: backTypeLine[0],
                        cardType: backTypeLine[1],
                        manaCost: turnManaCostIntoArray(
                            backFace.mana_cost as string,
                        ),
                        oracleText: backFace.oracle_text as string,
                        power: backFace.power as string | undefined,
                        toughness: backFace.toughness as string | undefined,
                    },
                };
            } else {
                const typeLine = splitStringByHyphen(card.type_line);
                parsedCardData = {
                    id: card.id,
                    name: card.name,
                    oracleText: card.oracle_text as string,
                    colorIdentity: card.color_identity as unknown as string,
                    imgUris: (card.image_uris ||
                        {}) as unknown as mtgImgSrcType,
                    manaCost: turnManaCostIntoArray(card.mana_cost as string),
                    cardSuperType: typeLine[0],
                    cardType: typeLine[1],
                    power: card.power as string | undefined,
                    toughness: card.toughness as string | undefined,
                };
            }

            return parsedCardData;
        });

    return output;
};

export const attachDeckRefsToParsedCards = (
    parsedCards: CardDataType[],
    decks: Deck[],
): CardWithDecksType[] => {
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

export const filterNonPlayableCards = (
    cards: ScryfallCard[],
): ScryfallCard[] => {
    // Filter out cards that are not legal in any paper format
    const filteredCards = cards.filter(
        (card: ScryfallCard) =>
            // This is why we don't assume a data schema when we're working with 3rd party data. @nickzou wants to make content about this
            card.games?.includes('paper') &&
            !card.layout?.includes('token') &&
            !card.layout?.includes('art_series') &&
            card.set_type !== 'memorabilia',
    );

    return filteredCards;
};
