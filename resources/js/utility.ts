import { useEffect } from 'react';
import { CardDataType } from './types/mtg';

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

export const filterNonPlayableCards = (cards: unknown[]): unknown[] => {
    if (!Array.isArray(cards)) {
        console.error('Expected an array but received:', cards);
        return [];
    }

    // Filter out cards that are not legal in any paper format
    const filteredCards = cards.filter(
        (card: any) =>
            card.games.includes('paper') &&
            !card.layout.includes('token') &&
            !card.layout.includes('art_series'),
    );

    return filteredCards;
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

export const useOutsideAlerter = (
    ref: React.RefObject<HTMLElement>,
    callback: () => void,
) => {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, callback]);
};

export const randFromRange = (min: number | undefined, max: number) => {
    if (min === undefined) {
        min = 0;
    }
    if (min > max) {
        console.error('Minimum value cannot be greater than maximum value');
        return null;
    }
    if (min === max) {
        return min;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// DELETE THIS LATER
// This is a temporary function to generate dummy data for testing purposes
// and should be replaced with actual data fetching logic.
export const generateCommanderSubarrays = (dummyData: any) => {
    const result: any[] = [];

    const getCardWithBackData = () =>
        dummyData.vanillaCommanders.find((card: any) => card.backCardData);

    const getCardWithColorIdentity = (count: number) =>
        dummyData.vanillaCommanders.find(
            (card: any) => card.colorIdentity.length === count,
        );

    const getCardWithNoColorIdentity = () =>
        dummyData.vanillaCommanders.find(
            (card: any) => card.colorIdentity.length === 0,
        );

    const getCompanionWithMatchingColorIdentity = (card: any) =>
        dummyData.companions.find((companion: any) =>
            companion.colorIdentity.every((color: string) =>
                card.colorIdentity.includes(color),
            ),
        );

    const getPartnerPair = () => {
        const [partner1, partner2] = dummyData.partenerCommanders.slice(0, 2);
        return [partner1, partner2];
    };

    const getBackgroundPair = () => {
        const commander = dummyData.backgroundCompatibleCommanders[0];
        const background = dummyData.backgrounds[0];
        return [commander, background];
    };

    // Add one of each type of subarray
    result.push([getCardWithBackData()]);
    result.push([getCardWithColorIdentity(1)]);
    result.push([getCardWithColorIdentity(2)]);
    result.push([getCardWithColorIdentity(3)]);
    result.push([getCardWithColorIdentity(4)]);
    result.push([getCardWithColorIdentity(5)]);
    result.push([getCardWithNoColorIdentity()]);

    const cardWithMatchingCompanion = getCardWithColorIdentity(3);
    result.push([
        cardWithMatchingCompanion,
        getCompanionWithMatchingColorIdentity(cardWithMatchingCompanion),
    ]);

    result.push(getPartnerPair());
    result.push(getBackgroundPair());

    // Fill the rest of the array with random subarrays to reach 24
    while (result.length < 24) {
        result.push([dummyData.vanillaCommanders[0]]);
    }

    return result;
};
