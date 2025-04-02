import { Deck } from '@/types/deck';
import { useState } from 'react';
import { ImSpinner11 } from 'react-icons/im';
import { MdDeleteForever } from 'react-icons/md';
import { CardDataType } from '../types/mtg';

import MTGCardFace from './MTGCardFace';

type MTGCardProps = CardDataType & {
    onDelete?: () => void;
    decks?: Deck[];
};

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
    onDelete,
    decks,
}: MTGCardProps) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [brokenImage, setBrokenImage] = useState(false);
    const [brokenBackImage, setBrokenBackImage] = useState(false);

    const renderButtons = () => {
        const deleteButton = () => (
            <button
                className={`btn btn-primary transition-rotate absolute right-0 top-0 rounded-full border-none bg-black/50 p-1 opacity-0 duration-200 ease-in-out hover:bg-black group-hover:opacity-100`}
                onClick={onDelete}
            >
                <MdDeleteForever size={25} />
            </button>
        );
        const flipButton = () => (
            <button
                className={`btn btn-primary transition-rotate absolute right-0 rounded-full border-none bg-slate-500/50 p-2 duration-200 ease-in-out hover:rotate-180`}
                onClick={() => setIsFlipped(!isFlipped)}
            >
                <ImSpinner11 />
            </button>
        );
        return (
            <div className="card-actions group absolute z-10 aspect-[2.5/3.5] w-full content-center">
                {onDelete && deleteButton()}
                {backCardData && flipButton()}
            </div>
        );
    };

    return (
        <div
            className={`card group/card rounded-mtg relative aspect-[2.5/3.5] w-full overflow-hidden shadow-md`}
        >
            <div className="overlay rounded-mtg absolute left-[-100%] top-0 z-10 flex h-full w-full flex-col items-center justify-center bg-zinc-900/90 opacity-0 duration-150 ease-in-out group-hover/card:left-0 group-hover/card:opacity-100">
                <h4 className="mb-2">
                    Your decks that use{' '}
                    <span className="font-bold">{name}</span>:
                </h4>
                <ul className="flex max-h-[90%] w-full flex-wrap justify-center gap-2 overflow-y-auto p-2">
                    {decks &&
                        decks.map((deck, index) => (
                            <li key={`deck-${deck.id}`}>
                                <a
                                    href={`/decks/${deck.id}`}
                                    className="rounded-md bg-zinc-700 px-2 py-1 text-white hover:bg-white hover:text-black"
                                >
                                    {deck.name}
                                </a>
                            </li>
                        ))}
                </ul>
            </div>
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
                    {renderButtons()}

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
                        {renderButtons()}
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
