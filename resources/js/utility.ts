import { CardDataType, rawCardDataType } from './types/mtg';

export const parseCardData = (cardData: rawCardDataType): CardDataType => {
    const parsedCardData = {
        ...cardData,
        imgSrc: JSON.parse(cardData.image_uris),
        manaCost: cardData.mana_cost ? JSON.parse(cardData.mana_cost) : null,
        cardSuperType: JSON.parse(cardData.type_line)[0],
        cardType: JSON.parse(cardData.type_line)[1],
    };

    return parsedCardData;
};
