type cardFaceDataType = {
    imgSrc: string;
    title: string;
    cardSuperType: string;
    cardType?: string;
    colorIdentity?: string;
    powerToughness?: [string, string];
    manaCost?: string;
    description: string;
    setBrokenImage: (value: boolean) => void;
    brokenImage: boolean;
};

const MTGCardFace = ({
    imgSrc,
    title,
    cardSuperType,
    cardType,
    colorIdentity,
    powerToughness,
    manaCost,
    description,
    setBrokenImage,
    brokenImage,
}: cardFaceDataType) => {
    return (
        <>
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
                        <div className="mb-2 flex w-full justify-between align-baseline">
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

                    <div className="flex min-h-[80%] w-full flex-col justify-between">
                        <div>
                            <p>{description}</p>
                        </div>

                        {powerToughness && (
                            <div className="mt-2 flex w-full justify-end">
                                <span>{`${powerToughness[0]}/${powerToughness[1]}`}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MTGCardFace;
