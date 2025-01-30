import { useState } from 'react';
import { ImSpinner11 } from 'react-icons/im';
import { CardDataType } from '../types/mtg';

import MTGCardFace from './MTGCardFace';

const MTGCard = ({
    imgUris,
    name,
    cardSuperType,
    cardType,
    colorIdentity,
    power,
    toughness,
    manaCost,
    oracleText,
    backCardData,
}: CardDataType) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [brokenImage, setBrokenImage] = useState(false);
    const [brokenBackImage, setBrokenBackImage] = useState(false);

    const renderButton = () => {
        return (
            <div className="card-actions absolute z-10 aspect-[2.5/3.5] w-full content-center">
                <button
                    className={`btn btn-primary transition-rotate absolute right-0 rounded-full border-none bg-slate-500/50 p-2 duration-200 ease-in-out hover:rotate-180`}
                    onClick={() => setIsFlipped(!isFlipped)}
                >
                    <ImSpinner11 />
                </button>
            </div>
        );
    };

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
                    {backCardData && renderButton()}

                    <MTGCardFace
                        imgUris={imgUris}
                        name={name}
                        cardSuperType={cardSuperType}
                        cardType={cardType}
                        colorIdentity={colorIdentity}
                        power={power}
                        toughness={toughness}
                        manaCost={manaCost}
                        oracleText={oracleText}
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
                        {renderButton()}
                        <MTGCardFace
                            imgUris={backCardData.imgUris}
                            name={backCardData.name}
                            cardSuperType={backCardData.cardSuperType}
                            cardType={backCardData.cardType}
                            colorIdentity={backCardData.colorIdentity}
                            power={backCardData.power}
                            toughness={backCardData.toughness}
                            manaCost={backCardData.manaCost}
                            oracleText={backCardData.oracleText}
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
