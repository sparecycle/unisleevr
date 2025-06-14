import Card from '@/Components/Unauthenticated/HeroCard';
import Title from '@/Components/Unauthenticated/HeroTitle';

const Hero = () => {
    return (
        <section className="relative h-[75vh] overflow-hidden">
            {/* 3D cubes background */}
            <div className="pointer-events-none absolute inset-0 z-0">
                <div className="cube-bg-grid -mt-[30px] -ml-[32px] grid h-full w-full grid-cols-5 grid-rows-6 gap-x-25 gap-y-30">
                    {Array.from({ length: 28 }).map((_, i) => (
                        <div
                            key={i}
                            className={
                                'cube-3d mx-auto my-auto' +
                                ((i % 5) % 2 === 1 ? ' cube-3d-stagger' : '')
                            }
                        >
                            <div className="cube-3d-inner">
                                <div className="cube-3d-face front"></div>
                                <div className="cube-3d-face back"></div>
                                <div className="cube-3d-face right"></div>
                                <div className="cube-3d-face left"></div>
                                <div className="cube-3d-face top"></div>
                                <div className="cube-3d-face bottom"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="relative z-2 container mx-auto flex h-full flex-col items-center gap-3 px-4 pt-[20vh] text-center text-white">
                <Title>One Card, Many Decks</Title>
                <div className="w-5/6">
                    <p className="text-base leading-6">
                        Manage your Commander staples across every deck with a
                        single collection.
                    </p>
                </div>
                <div className="py-2">
                    <button className="font-title rounded-md border-1 border-white bg-black px-6 py-2 text-lg leading-9 font-medium uppercase">
                        Start Building
                    </button>
                </div>
            </div>
            <Card />
        </section>
    );
};

export default Hero;
//TODO: Animation of Card angled towards the distance, one point perspective, animation that is like a sheen across the card, possibly showing the faces of popular commanders over a particular staple, Cyclonic Rift?
