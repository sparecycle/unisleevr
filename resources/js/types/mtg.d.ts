export interface mtgImgSrc {
    normal: string;
    large: string;
    png: string;
    art_crop: string;
    border_crop: string;
    small: string;
}

export interface rawCardDataType {
    id: string;
    name: string;
    image_uris: mtgImgSrc;
    mana_cost: string;
    color_identity: string;
    oracle_text: string;
    scryfall_uri: string;
    power: string;
    toughness: string;
    type_line: string;
    updated_at: string;
    created_at: string;
}

export interface CardDataType {
    id: string;
    imgSrc: mtgImgSrc;
    name: string;
    cardSuperType: string[];
    cardType?: string[];
    colorIdentity?: string;
    manaCost?: string[];
    oracle_text: string;
    power?: string;
    toughness?: string;
    backCardData?: CardDataType;
}
