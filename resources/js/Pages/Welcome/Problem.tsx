import Paragraph from '@/Components/Unauthenticated/Paragraph';
import Section from '@/Components/Unauthenticated/Section';
import SectionTitle from '@/Components/Unauthenticated/SectionTitle';

const Problem = () => {
    return (
        <Section className="min-h-1/2 bg-zinc-700">
            <SectionTitle eyebrow="Never buy another staple again">
                Where's My Rhystic Study?
            </SectionTitle>
            <Paragraph>
                Many decks. One expensive card. Endless compromises.
            </Paragraph>
            <ul className="my-3 list-disc pl-5">
                <li>Sick of keeping track of which deck has that card?</li>
                <li>Tired of buying the same card over and over again?</li>
                <li>Are your proxies out of control?</li>
            </ul>
        </Section>
    );
};

export default Problem;
