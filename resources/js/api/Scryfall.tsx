export const scryfallSearch = async (searchQuery: string) => {
    try {
        const response = await fetch(
            `https://api.scryfall.com/cards/search?order=name&q=${searchQuery}`,
        );
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error(error);
        return error;
    }
};

export const scryfallNamedSearch = async (searchQuery: string) => {
    try {
        const response = await fetch(
            `https://api.scryfall.com/cards/named?fuzzy=${searchQuery}`,
        );
        const data = await response.json();
        console.log('Named search data:', data);
        return data;
    } catch (error) {
        console.error(error);
        return error;
    }
};

export const scryfallAutoComplete = async (searchQuery: string) => {
    try {
        const response = await fetch(
            `https://api.scryfall.com/cards/autocomplete?q=${searchQuery}`,
        );
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error(error);
        return error;
    }
};
