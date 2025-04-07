export interface Deck {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    user_id: number;
    cards: CardDataType[];
};
export interface DeckWithCommanders {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    user_id: number;
    cards: CardDataType[];
    commanders: CardDataType[];
    color_identity: string[];
};
