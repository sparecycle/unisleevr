import { useState } from "react";
import { ImSpinner11 } from "react-icons/im";

type cardDataType = {
    imgSrc: string,
    title: string,
    description: string,
    cmc: number,
    colorIdentity: string,
    backCardData?: cardDataType
}

const MTGCard =  ({ imgSrc,title,description,backCardData }:cardDataType) => {

    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className="card bg-base-100 w-full shadow-xl">
            <div className="card__content" style={{
                'transformStyle' : 'preserve-3d',
                'transition': 'transform 1s',
                'transform': isFlipped ? 'rotateY(.5turn)' : 'rotateY(0)'
                }}>
                <div className="card__front absolute top-0 bottom-0 right-0" style={{'backfaceVisibility': 'hidden'}}>
                    <figure className="rounded-3xl">
                        <img
                        src={imgSrc}
                        alt={title} />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{title}</h2>
                        <p>{description}</p>
                        <div className="card-actions justify-end">
                        {backCardData &&(
                            <button className="btn btn-primary" onClick={()=>setIsFlipped(!isFlipped)}>
                                <ImSpinner11 />
                            </button>
                        )}
                        
                        </div>
                    </div>
                </div>
                {backCardData && (
                    <div className="absolute top-0 bottom-0 right-0 left-0" style={{ 
                        'backfaceVisibility': 'hidden', 
                        'transform': 'rotateY(.5turn)'}}>
                        <figure className="rounded-3xl">
                            <img
                            src={backCardData.imgSrc}
                            alt={backCardData.title} />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{backCardData.title}</h2>
                            <p>{backCardData.description}</p>
                            <div className="card-actions justify-end">
                            <button className="btn btn-primary" onClick={()=>setIsFlipped(!isFlipped)}>
                                <ImSpinner11 />
                            </button>
                            </div>
                        </div>
                    </div>
                )}
                
            </div>
            
        </div>
    )

}

export default MTGCard