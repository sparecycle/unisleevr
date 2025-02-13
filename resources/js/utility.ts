import { CardDataType } from './types/mtg';

// currently an any because this takes the raw card data from scryfall.
export const parseCardData = (cardData: any[]): CardDataType[] | [] => {
    // Filter out cards that are not paper i.e. Arena only && tokens && art series
    // note: this might not be necessary if the scryfall search query is more specific
    const preFilteredCardData = cardData.filter(
        (card) =>
            card.games.includes('paper') &&
            !card.layout.includes('token') &&
            !card.layout.includes('art_series'),
    );

    const output = preFilteredCardData.map((card) => {
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

export const splitStringByHyphen = (input: string): [string[], string[]] => {
    // Match words before and after the hyphen
    const matches = input.match(/^(.+?)\s*—\s*(.+)$/);

    // Check if the match was successful
    if (matches && matches.length === 3) {
        const beforeHyphen = matches[1].trim().split(/\s+/);
        const afterHyphen = matches[2].trim().split(/\s+/);
        return [beforeHyphen, afterHyphen];
    }

    // If no hyphen is found, return all strings in the first array
    const beforeHyphen = input.trim().split(/\s+/);
    return [beforeHyphen, []];
};

export const turnManaCostIntoArray = (manaCost: string): string[] => {
    // Match all mana symbols in the string
    const matches = manaCost.match(/{(.+?)}/g);

    // Check if the match was successful
    if (matches) {
        return matches;
    }

    return [];
};

export const debounce = (func: (...args: any[]) => void, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};
