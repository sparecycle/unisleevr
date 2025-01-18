export const scryfallSearch = async (searchQuery: string): Promise<any[]> => {
    const response = await fetch(
        `https://api.scryfall.com/cards/search?order=name&q=${searchQuery}`,
    );
    const data = await response.json();
    return data.data;
};

export const scryfallAutoComplete = async (searchQuery: string) => {
    try {
        const response = await fetch(
            `https://api.scryfall.com/cards/autocomplete?q=${searchQuery}`,
        );
        const data = await response.json();
        console.log(data);
        return data.data;
    } catch (error) {
        console.error(error);
        return error;
    }
    // const response = await fetch(
    //     `https://api.scryfall.com/cards/autocomplete?q=${searchQuery}`,
    // );
    // const data = await response.json();
    // return data.data;
};
