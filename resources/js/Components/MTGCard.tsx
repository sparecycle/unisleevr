import { useState } from 'react';
import { ImSpinner11 } from 'react-icons/im';
import { CardDataType } from '../types/mtg';

import MTGCardFace from './MTGCardFace';

const MTGCard = ({
    imgSrc,
    name,
    cardSuperType,
    cardType,
    colorIdentity,
    power,
    toughness,
    manaCost,
    oracle_text,
    backCardData,
}: CardDataType) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [brokenImage, setBrokenImage] = useState(false);
    const [brokenBackImage, setBrokenBackImage] = useState(false);

    return (
        <div
            className={`card relative aspect-[2.5/3.5] w-full overflow-hidden shadow-xl`}
        >
            <div
                className="card_content relative"
                style={{
                    transformStyle: 'preserve-3d',
                    transition: 'transform 1s',
                    transform: isFlipped ? 'rotateY(.5turn)' : 'rotateY(0)',
                }}
            >
                <div
                    className={`card_front absolute top-0 z-10 h-full w-full`}
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    {backCardData && (
                        <div className="card-actions absolute z-10 aspect-[2.5/3.5] w-full content-center justify-end">
                            <button
                                className="btn btn-primary rounded-full border-none bg-stone-50/50 hover:rotate-180 hover:bg-stone-50"
                                onClick={() => setIsFlipped(!isFlipped)}
                            >
                                <ImSpinner11 />
                            </button>
                        </div>
                    )}

                    <MTGCardFace
                        imgSrc={imgSrc}
                        name={name}
                        cardSuperType={cardSuperType}
                        cardType={cardType}
                        colorIdentity={colorIdentity}
                        power={power}
                        toughness={toughness}
                        manaCost={manaCost}
                        oracle_text={oracle_text}
                        setBrokenImage={setBrokenImage}
                        brokenImage={brokenImage}
                    />
                </div>
                {backCardData && (
                    <div
                        className="card_back absolute top-0 w-full"
                        style={{
                            backfaceVisibility: 'hidden',
                            transform: 'rotateY(.5turn)',
                        }}
                    >
                        <div className="card-actions absolute z-10 aspect-[2.5/3.5] w-full content-center justify-end">
                            <button
                                className="btn btn-primary rounded-full border-none bg-stone-50/50 hover:rotate-180 hover:bg-stone-50"
                                onClick={() => setIsFlipped(!isFlipped)}
                            >
                                <ImSpinner11 />
                            </button>
                        </div>
                        <MTGCardFace
                            imgSrc={backCardData.imgSrc}
                            name={backCardData.name}
                            cardSuperType={backCardData.cardSuperType}
                            cardType={backCardData.cardType}
                            colorIdentity={backCardData.colorIdentity}
                            power={backCardData.power}
                            toughness={backCardData.toughness}
                            manaCost={backCardData.manaCost}
                            oracle_text={backCardData.oracle_text}
                            setBrokenImage={setBrokenBackImage}
                            brokenImage={brokenBackImage}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default MTGCard;
