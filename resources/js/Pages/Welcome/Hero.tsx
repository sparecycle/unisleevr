import { CubeBg } from '@/Components/CubeBg';
import Card from '@/Components/Unauthenticated/HeroCard';
import Title from '@/Components/Unauthenticated/HeroTitle';

const Hero = () => {
    return (
        <section className="relative flex h-[75vh] w-full overflow-hidden">
            {/* 3D cubes background */}
            <div className="pointer-events-none absolute inset-0 z-0 flex h-full w-full items-center justify-center overflow-hidden">
                <CubeBg />
            </div>
            <div className="relative z-2 mx-auto flex h-full w-full flex-col items-center justify-center md:container md:flex-row md:items-center md:justify-start">
                <div className="z-2 flex h-full flex-col items-center justify-start gap-3 pt-[15vh] text-center text-white sm:pt-[5vh] md:w-full md:items-start md:justify-center md:pt-0 md:text-left">
                    <Title>One Card, Many Decks</Title>
                    <div className="w-5/6 md:w-full">
                        <p className="text-base leading-6">
                            Manage your Commander staples across every deck with
                            a single collection.
                        </p>
                    </div>
                    <div className="py-2">
                        <button className="font-title rounded-md border-1 border-white bg-black px-6 py-2 text-lg font-medium uppercase">
                            Start Building
                        </button>
                    </div>
                </div>
                <div className="z-0 flex h-full w-full items-center justify-center">
                    <Card />
                </div>
            </div>
        </section>
    );
};

export default Hero;
//TODO: Animation of Card angled towards the distance, one point perspective, animation that is like a sheen across the card, possibly showing the faces of popular commanders over a particular staple, Cyclonic Rift?
