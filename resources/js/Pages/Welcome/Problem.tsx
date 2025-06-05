import ListItem from '@/Components/Unauthenticated/ListItem';
import Paragraph from '@/Components/Unauthenticated/Paragraph';
import Section from '@/Components/Unauthenticated/Section';
import SectionTitle from '@/Components/Unauthenticated/SectionTitle';

const Problem = () => {
    return (
        <Section className="min-h-1/2 bg-zinc-700">
            <SectionTitle eyebrow="Buying duplicates is expensive">
                Where's My Rhystic Study?
            </SectionTitle>
            <Paragraph>
                Many decks. One expensive card. Endless compromises.
            </Paragraph>
            <ul className="my-3 list-disc pl-5">
                <ListItem>
                    Sick of keeping track of which deck has that card?
                </ListItem>
                <ListItem>
                    Tired of buying the same card over and over again?
                </ListItem>
                <ListItem>Are your proxies out of control?</ListItem>
            </ul>
        </Section>
    );
};

export default Problem;
