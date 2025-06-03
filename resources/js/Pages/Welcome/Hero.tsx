import Card from '@/Components/Unauthenticated/HeroCard';
import Title from '@/Components/Unauthenticated/HeroTitle';
const Hero = () => {
    return (
        <section className="relative h-[75vh]">
            <div className="container relative z-2 mx-auto flex h-full flex-col items-center justify-center gap-3 px-4 text-center text-white">
                <Title>One Card, Many Decks</Title>
                <div className="w-5/6">
                    <p className="text-base leading-6">
                        Manage your Commander staples across every deck with a
                        single collection.
                    </p>
                </div>
                <div className="py-2">
                    <button className="rounded-md bg-rose-700 px-6 py-2 font-title text-lg font-medium uppercase">
                        Join the Waitlist
                    </button>
                </div>
            </div>
            <Card />
        </section>
    );
};

export default Hero;
//TODO: Animation of Card angled towards the distance, one point perspective, animation that is like a sheen across the card, possibly showing the faces of popular commanders over a particular staple, Cyclonic Rift?
