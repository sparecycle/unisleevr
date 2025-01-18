export const parseCardData = (cardData: any): any => {
    const typeLine = splitStringByHyphen(cardData.type_line);
    const parsedCardData = {
        ...cardData,
        imgSrc: cardData.image_uris,
        manaCost: turnManaCostIntoArray(cardData.mana_cost),
        cardSuperType: typeLine[0],
        cardType: typeLine[1],
    };

    return parsedCardData;
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
