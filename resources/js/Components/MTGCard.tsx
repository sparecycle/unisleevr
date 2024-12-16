import { useState } from "react";
import { ImSpinner11 } from "react-icons/im";

type cardDataType = {
    imgSrc: string,
    title: string,
    description: string,
    backCardData?: cardDataType
}

const MTGCard =  ({ imgSrc,title,description,backCardData }:cardDataType) => {

    const [isFlipped, setIsFlipped] = useState(false);
    const [brokenImage, setBrokenImage] = useState(false);
    const [brokenBackImage, setBrokenBackImage] = useState(false);


    return (
        <div className={`card w-full max-md:max-h-[50vw] max-h-[25vw] h-screen  shadow-xl relative rounded-2xl overflow-hidden`}>
             
            
            <div className="card_content relative rounded-2xl" style={{
                'transformStyle': 'preserve-3d',
                'transition': 'transform 1s',
                'transform': isFlipped ? 'rotateY(.5turn)' : 'rotateY(0)'
            }}>
               
                  
                <div className={`card_front absolute top-0 z-10 w-full h-full`} style={{ 'backfaceVisibility': 'hidden' }}>
                    {backCardData && (
                        <div className="card-actions absolute w-full max-md:max-h-[50vw] max-h-[25vw] h-screen z-10 justify-end content-center">
                            <button className="btn btn-primary rounded-full bg-stone-50/50 hover:bg-stone-50 hover:rotate-180 border-none" onClick={() => setIsFlipped(!isFlipped)}>
                                <ImSpinner11 />
                            </button>
                        </div>
                    )}
                    {!brokenImage && (

                        <figure className="rounded-2xl relative">
                                <img
                                className="rounded-2xl max-md:max-h-[50vw] max-h-[25vw] h-screen"
                                src={imgSrc}
                                alt={title} 
                                onError={()=>{setBrokenImage(true)}}
                            />
                            
                        </figure>
                    )}

                    <div className="card-body absolute top-0 p-0">
                        
                        <div className={`card-body-text w-full ${!brokenImage && 'opacity-0'} bg-slate-800 p-4 rounded-2xl max-md:max-h-[50vw] max-h-[25vw] h-screen`}>
                            <h2 className="card-title">{title}</h2>
                            <p>{description}</p>
                        </div>
                       
                        
                    </div>
                    
                </div>
                {backCardData && (
                    <div className="card_back absolute top-0 w-full" style={{ 
                        'backfaceVisibility': 'hidden', 
                        'transform': 'rotateY(.5turn)'}}>
                        <div className="card-actions absolute h-full w-full z-10 justify-end content-center">
                            <button className="btn btn-primary rounded-full bg-stone-50/50 hover:bg-stone-50 hover:rotate-180 border-none" onClick={() => setIsFlipped(!isFlipped)}>
                                <ImSpinner11 />
                            </button>
                        </div>
                        <figure className="rounded-2xl relative z-1">
                            <img
                            className="rounded-2xl max-md:max-h-[50vw] max-h-[25vw] h-screen"
                            src={backCardData.imgSrc}
                            alt={backCardData.title} 
                            onError={()=>{setBrokenBackImage(true)}}

                            />
                        </figure>
                        <div className="card-body absolute top-0 p-0">
                        
                            <div className={`card-body-text w-full ${!brokenBackImage && 'opacity-0'} bg-slate-800 p-4 rounded-2xl max-h-[25vw] h-screen`}>
                                <h2 className="card-title">{backCardData.title}</h2>
                                <p>{backCardData.description}</p>
                            </div>
                        
                            
                        </div>
                    </div>
                )}
                
            </div>
            
        </div>
    )

}

export default MTGCard