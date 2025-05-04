import { useEffect } from 'react';
import { CardDataType, mtgColorStrings } from '../types/mtg';

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

export const getColorIdentityFromCommanders = (
    commanders: CardDataType[],
): mtgColorStrings[] => {
    if (!commanders || commanders.length === 0) {
        console.log('No commanders found');
        return [];
    }

    const colorIdentities = commanders.flatMap(
        (card: CardDataType) => card.colorIdentity,
    );
    const uniqueColorIdentities = Array.from(new Set(colorIdentities));

    const output = uniqueColorIdentities
        .filter(
            (color): color is mtgColorStrings =>
                color !== undefined && 'WUBRG'.includes(color),
        )
        .sort((a, b) => 'WUBRG'.indexOf(a) - 'WUBRG'.indexOf(b)); // Reorder to WUBRG

    return output;
};
