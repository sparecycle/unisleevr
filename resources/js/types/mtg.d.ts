export interface CardDataType {
    id: number;
    imgSrc: string;
    name: string;
    cardSuperType: string;
    cardType?: string;
    colorIdentity?: string;
    manaCost?: string;
    oracle_text: string;
    powerToughness?: [string, string];
    backCardData?: CardDataType;
}
