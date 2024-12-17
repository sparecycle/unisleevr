import { useState } from 'react';
import { ImSpinner11 } from 'react-icons/im';
import MTGCardFace from './MTGCardFace';

type cardDataType = {
    imgSrc: string;
    title: string;
    cardSuperType: string;
    cardType?: string;
    colorIdentity?: string;
    manaCost?: string;
    description: string;
    powerToughness?: [string, string];
    backCardData?: cardDataType;
};

const MTGCard = ({
    imgSrc,
    title,
    cardSuperType,
    cardType,
    colorIdentity,
    powerToughness,
    manaCost,
    description,
    backCardData,
}: cardDataType) => {
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
                        title={title}
                        cardSuperType={cardSuperType}
                        cardType={cardType}
                        colorIdentity={colorIdentity}
                        powerToughness={powerToughness}
                        manaCost={manaCost}
                        description={description}
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
                            title={backCardData.title}
                            cardSuperType={backCardData.cardSuperType}
                            cardType={backCardData.cardType}
                            colorIdentity={backCardData.colorIdentity}
                            powerToughness={backCardData.powerToughness}
                            manaCost={backCardData.manaCost}
                            description={backCardData.description}
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
