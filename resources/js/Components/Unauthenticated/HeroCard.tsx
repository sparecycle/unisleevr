const HeroCard = () => {
    return (
        <div className="absolute -bottom-14 left-1/2 z-0 w-2/3 -translate-x-1/2">
            <div className="z-0 perspective-near transform-3d">
                <div className="rotate-x-42">
                    <div className="hero-card-wrapper rounded-mtg relative overflow-hidden text-white">
                        <img src="https://cards.scryfall.io/large/front/c/9/c94079dd-023a-41b2-9004-95bbb0e41267.jpg?1593814137" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroCard;
