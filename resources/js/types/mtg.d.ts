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
