const HeroCard = () => {
    return (
        <div className="absolute bottom-0 left-1/2 z-[0] w-2/3 -translate-x-1/2">
            <div className="perspective-near transform-3d z-[0]">
                <div className="rotate-x-42">
                    <div className="aspect-[2.5/3.5] bg-gray-200 text-white">
                        card
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroCard;
