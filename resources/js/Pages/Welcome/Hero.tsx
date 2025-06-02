const Hero = () => {
    return (
        <section className="h-[75vh]">
            <div className="container mx-auto flex h-full flex-col items-center justify-center gap-3 px-4 text-center text-white">
                <h1 className="font-title text-3xl font-semibold uppercase leading-10">
                    One Card, Many Decks
                </h1>
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
        </section>
    );
};

export default Hero;
