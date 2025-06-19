import IconCardDecks from '@/Components/Icons/IconCardDecks';
import IconCardSearch from '@/Components/Icons/IconCardSearch';
import IconColorIdentities from '@/Components/Icons/IconColorIdentities';
import IconList from '@/Components/Icons/IconList';
import Picture from '@/Components/Picture';
import IconText from '@/Components/Unauthenticated/IconText';
import Paragraph from '@/Components/Unauthenticated/Paragraph';
import Section from '@/Components/Unauthenticated/Section';
import SectionTitle from '@/Components/Unauthenticated/SectionTitle';
import { ReactNode } from 'react';

type ColumnProps = {
    children: ReactNode;
};

const Column = ({ children }: ColumnProps) => {
    return (
        <div className="w-1/2 p-6 md:w-1/3 lg:w-1/4 lg:py-10">{children}</div>
    );
};

const Solution = () => {
    return (
        <Section
            useBackground={true}
            background={
                <Picture
                    src="images/piles.jpg"
                    alt="Piles of Magic Cards"
                    sizes={{
                        mobile: '320w',
                        tablet: '640w',
                        small: '1024w',
                        desktop: '1920w',
                        large: '2560w',
                        ultra: '3840w',
                    }}
                    className={
                        'absolute top-1/2 left-1/2 z-[0] -translate-x-1/2 -translate-y-1/2'
                    }
                />
            }
        >
            <div className="container mx-auto flex flex-wrap justify-center gap-y-3">
                <SectionTitle className="w-full text-center">
                    Smarter Deckbuilding Starts Here
                </SectionTitle>
                <div className="mx-auto w-full text-center md:mb-6">
                    <div className="mx-auto w-full lg:w-3/5">
                        <Paragraph>
                            Build smarter with a tool that tracks which cards
                            are shared between decks and helps you decide where
                            they go before game night.
                        </Paragraph>
                    </div>
                </div>
                <Column>
                    <IconText
                        icon={<IconCardSearch />}
                        text="Auto-detect shared cards across decks"
                    />
                </Column>
                <Column>
                    <IconText
                        icon={<IconList />}
                        text="Create an easy pull list before game night"
                    />
                </Column>
                <Column>
                    <IconText
                        icon={<IconCardDecks />}
                        text="See at a glance how many decks a card is in"
                    />
                </Column>
                <Column>
                    <IconText
                        icon={<IconColorIdentities />}
                        text="Automatic color identity checks when you swap commanders."
                    />
                </Column>
            </div>
        </Section>
    );
};

export default Solution;
