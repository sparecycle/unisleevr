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
            className={`card relative h-screen max-h-[25vw] w-full overflow-hidden rounded-2xl shadow-xl max-md:max-h-[50vw]`}
        >
            <div
                className="card_content relative rounded-2xl"
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
                        <div className="card-actions absolute z-10 h-screen max-h-[25vw] w-full content-center justify-end max-md:max-h-[50vw]">
                            <button
                                className="btn btn-primary rounded-full border-none bg-stone-50/50 hover:rotate-180 hover:bg-stone-50"
                                onClick={() => setIsFlipped(!isFlipped)}
                            >
                                <ImSpinner11 />
                            </button>
                        </div>
                    )}
                    {!brokenImage && (
                        <figure className="relative rounded-2xl">
                            <img
                                className="h-screen max-h-[25vw] rounded-2xl max-md:max-h-[50vw]"
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
                            className={`card-body-text w-full ${!brokenImage && 'opacity-0'} h-screen max-h-[25vw] rounded-2xl bg-slate-800 p-4 max-md:max-h-[50vw]`}
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
                        <figure className="z-1 relative rounded-2xl">
                            <img
                                className="h-screen max-h-[25vw] rounded-2xl max-md:max-h-[50vw]"
                                src={backCardData.imgSrc}
                                alt={backCardData.title}
                                onError={() => {
                                    setBrokenBackImage(true);
                                }}
                            />
                        </figure>
                        <div className="card-body absolute top-0 p-0">
                            <div
                                className={`card-body-text w-full ${!brokenBackImage && 'opacity-0'} h-screen max-h-[25vw] rounded-2xl bg-slate-800 p-4`}
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
