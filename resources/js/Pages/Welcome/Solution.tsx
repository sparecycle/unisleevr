import IconCardDecks from '@/Components/Icons/IconCardDecks';
import IconCardSearch from '@/Components/Icons/IconCardSearch';
import IconGuilds from '@/Components/Icons/IconGuilds';
import IconList from '@/Components/Icons/IconList';
import IconText from '@/Components/Unauthenticated/IconText';
import Paragraph from '@/Components/Unauthenticated/Paragraph';
import Section from '@/Components/Unauthenticated/Section';
import SectionTitle from '@/Components/Unauthenticated/SectionTitle';
const Solution = () => {
    return (
        <Section>
            <div className="container mx-auto flex flex-wrap gap-y-3">
                <SectionTitle className="w-full text-center">
                    Smarter Deckbuilding Starts Here
                </SectionTitle>
                <div className="w-full text-center">
                    <Paragraph>
                        Build smarter with a tool that tracks which cards are
                        shared between decks — and helps you decide where they
                        go before game night.
                    </Paragraph>
                </div>
                <div className="w-1/2 p-6">
                    <IconText
                        icon={<IconCardSearch />}
                        text="Auto-detect shared cards across decks"
                    />
                </div>
                <div className="w-1/2 p-6">
                    <IconText
                        icon={<IconList />}
                        text="Create an easy pull list before game night"
                    />
                </div>
                <div className="w-1/2 p-6">
                    <IconText
                        icon={<IconCardDecks />}
                        text="See at a glance how many decks a card is in"
                    />
                </div>
                <div className="w-1/2 p-6">
                    <IconText
                        icon={<IconGuilds />}
                        text="Automatic color identity checks when you swap commanders."
                    />
                </div>
            </div>
        </Section>
    );
};

export default Solution;
