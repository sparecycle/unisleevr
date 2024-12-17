import { useState } from 'react';
import { ImSpinner11 } from 'react-icons/im';

type cardDataType = {
    imgSrc: string;
    title: string;
    cardSuperType: string;
    cardType?: string;
    colorIdentity?: string;
    manaCost?: string;
    description: string;
    backCardData?: cardDataType;
    powerToughness?: [string, string];
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
                    {!brokenImage && (
                        <figure className="relative">
                            <img
                                className="w-full rounded-[6%]"
                                src={imgSrc}
                                alt={title}
                                onError={() => {
                                    setBrokenImage(true);
                                }}
                            />
                        </figure>
                    )}

                    <div className="card-body absolute top-0 p-0">
                        <div
                            className={`card-body-text w-full ${!brokenImage && 'opacity-0'} flex aspect-[2.5/3.5] flex-col justify-between bg-slate-800 p-4`}
                        >
                            <div className="w-full">
                                <div className="mb-2 flex w-full justify-between">
                                    <div>
                                        <h3 className="card-title">{title}</h3>
                                    </div>
                                    <div>
                                        {manaCost && (
                                            <span className="mana-cost">
                                                {manaCost}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <p className="mb-2">
                                        {cardSuperType}
                                        {cardType && ` - ${cardType}`}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p>{description}</p>
                            </div>

                            {powerToughness && (
                                <div className="mt-2 flex w-full justify-end self-end">
                                    <span>{`${powerToughness[0]}/${powerToughness[1]}`}</span>
                                </div>
                            )}
                        </div>
                    </div>
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
                        <figure className="z-1 relative">
                            <img
                                className="w-full rounded-[6%]"
                                src={backCardData.imgSrc}
                                alt={backCardData.title}
                                onError={() => {
                                    setBrokenBackImage(true);
                                }}
                            />
                        </figure>
                        <div className="card-body absolute top-0 p-0">
                            <div
                                className={`card-body-text w-full ${!brokenBackImage && 'opacity-0'} flex aspect-[2.5/3.5] flex-col justify-between bg-slate-800 p-4`}
                            >
                                <div className="w-full">
                                    <div className="mb-2 flex w-full justify-between">
                                        <div>
                                            <h3 className="card-title">
                                                {backCardData.title}
                                            </h3>
                                        </div>
                                        <div>
                                            {backCardData.manaCost && (
                                                <span className="mana-cost">
                                                    {backCardData.manaCost}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="mb-2">
                                            {backCardData.cardSuperType}
                                            {backCardData.cardType && ` - ${backCardData.cardType}`}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <p>{backCardData.description}</p>
                                </div>

                                {backCardData.powerToughness && (
                                    <div className="mt-2 flex w-full justify-end self-end">
                                        <span>{`${backCardData.powerToughness[0]}/${backCardData.powerToughness[1]}`}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MTGCard;
