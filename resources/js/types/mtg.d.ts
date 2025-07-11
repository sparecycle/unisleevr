export type mtgColorStrings = 'W' | 'U' | 'B' | 'R' | 'G';

export type ScryfallCard = {
    id: string;
    name: string;
    type_line: string;
    card_faces?: ScryfallCardFace[];
    games?: string[];
    layout?: string[];
    set_type?: string;
    // ... other known properties
    [key: string]: unknown | unknown[]; // for additional properties
};

export type ScryfallCardFace = {
    name: string;
    type_line: string;
    oracle_text: string;
    image_uris?: Record<string, string>;
    mana_cost?: string;
    power?: string;
    toughness?: string;
    // ... other known properties
    [key: string]: unknown; // for additional properties
};

export interface mtgImgSrcType {
    normal: string;
    large: string;
    png: string;
    art_crop: string;
    border_crop: string;
    small: string;
}

export interface CardDataType {
    id: string;
    imgUris: mtgImgSrcType;
    name: string;
    cardSuperType: string[];
    cardType?: string[];
    colorIdentity?: string;
    manaCost?: string[];
    oracleText: string;
    power?: string;
    toughness?: string;
    backCardData?: CardDataType;
    isInvalidColor?: boolean;
}

export type CardWithDecksType = CardDataType & {
    decks: Deck[] | undefined;
};

export interface Deck {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    user_id: number;
    cards: CardWithDecksType[];
    commanders: CardWithDecksType[];
    color_identity: mtgColorStrings[];
}
