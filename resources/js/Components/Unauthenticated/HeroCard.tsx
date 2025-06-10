import { heroCards } from '@/constants';
import { randFromRange } from '@/utilities/general';
import { useEffect, useState } from 'react';

const HeroCard = () => {
    const [currentHeroCard, setCurrentHeroCard] = useState(
        heroCards[randFromRange(0, heroCards.length - 1) as number],
    );
    const [shineActive, setShineActive] = useState(false);

    const getNextHeroCard = () => {
        const nextIndex = heroCards.indexOf(currentHeroCard) + 1;
        if (nextIndex >= heroCards.length) {
            return heroCards[0];
        }
        return heroCards[nextIndex];
    };

    // Change hero card every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            // Trigger shine animation
            setShineActive(true);
            // Update current hero card after a short delay to allow shine animation to play a little to hide the transition
            setTimeout(() => {
                setCurrentHeroCard(getNextHeroCard());
            }, 100);
        }, 5000);
        return () => clearInterval(interval);
    }, [currentHeroCard]);

    useEffect(() => {
        // Timeout ensures reflow so animation can restart
        const timeout = setTimeout(() => setShineActive(false), 1000);
        return () => clearTimeout(timeout);
    }, [currentHeroCard]);

    return (
        <div className="absolute -bottom-14 left-1/2 z-0 w-5/7 -translate-x-1/2">
            <div className="z-0 perspective-near transform-3d">
                <div className="rotate-x-25">
                    <div
                        className={`hero-card-wrapper rounded-mtg relative overflow-hidden text-white ${shineActive ? 'shine-animate' : ''}`}
                    >
                        <img src={currentHeroCard.img} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroCard;
