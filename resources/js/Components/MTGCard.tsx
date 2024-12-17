import { useState } from 'react';
import { ImSpinner11 } from 'react-icons/im';

type cardDataType = {
    imgSrc: string;
    title: string;
    description: string;
    backCardData?: cardDataType;
};

const MTGCard = ({
    imgSrc,
    title,
    description,
    backCardData,
}: cardDataType) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [brokenImage, setBrokenImage] = useState(false);
    const [brokenBackImage, setBrokenBackImage] = useState(false);

    return (
        <div
            className={`card relative aspect-[2.5/3.5] w-full overflow-hidden rounded-[3.5] shadow-xl`}
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
                        <div className="card-actions absolute z-10 w-full aspect-[2.5/3.5] content-center justify-end">
                            <button
                                className="btn btn-primary rounded-full border-none bg-stone-50/50 hover:rotate-180 hover:bg-stone-50"
                                onClick={() => setIsFlipped(!isFlipped)}
                            >
                                <ImSpinner11 />
                            </button>
                        </div>
                    )}
                    {!brokenImage && (
                        <figure className="relative rounded-[3.5]">
                            <img
                                className="rounded-[3.5] w-full"
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
                            className={`card-body-text w-full ${!brokenImage && 'opacity-0'} rounded-[3.5] bg-slate-800 p-4 aspect-[2.5/3.5]`}
                        >
                            <h2 className="card-title">{title}</h2>
                            <p>{description}</p>
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
                        <div className="card-actions absolute z-10 h-full w-full content-center justify-end">
                            <button
                                className="btn btn-primary rounded-full border-none bg-stone-50/50 hover:rotate-180 hover:bg-stone-50"
                                onClick={() => setIsFlipped(!isFlipped)}
                            >
                                <ImSpinner11 />
                            </button>
                        </div>
                        <figure className="z-1 relative rounded-[3.5]">
                            <img
                                className="rounded-[3.5] w-full"
                                src={backCardData.imgSrc}
                                alt={backCardData.title}
                                onError={() => {
                                    setBrokenBackImage(true);
                                }}
                            />
                        </figure>
                        <div className="card-body absolute top-0 p-0">
                            <div
                            className={`card-body-text w-full ${!brokenBackImage && 'opacity-0'} rounded-[3.5] bg-slate-800 p-4 aspect-[2.5/3.5]`}
                            >
                                <h2 className="card-title">
                                    {backCardData.title}
                                </h2>
                                <p>{backCardData.description}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MTGCard;
