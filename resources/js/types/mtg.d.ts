export interface mtgImgSrc {
    normal: string;
    large: string;
    png: string;
    art_crop: string;
    border_crop: string;
    small: string;
}

export interface CardDataType {
    id: string;
    imgUris: mtgImgSrc;
    name: string;
    cardSuperType: string[];
    cardType?: string[];
    colorIdentity?: string;
    manaCost?: string[];
    oracleText: string;
    power?: string;
    toughness?: string;
    backCardData?: CardDataType;
}

export type CardsWithDecks = CardDataType & {
    decks: Deck[] | undefined;
};

export interface Deck {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    user_id: number;
    cards: CardDataType[];
    commanders: CardDataType[];
}
