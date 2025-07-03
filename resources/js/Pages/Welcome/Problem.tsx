import Paragraph from '@/Components/Unauthenticated/Paragraph';
import Section from '@/Components/Unauthenticated/Section';
import SectionTitle from '@/Components/Unauthenticated/SectionTitle';

const Problem = () => {
    return (
        <Section className="min-h-1/2">
            <div className="flex flex-col items-start gap-y-3 xl:w-3/5">
                <SectionTitle eyebrow="Never buy duplicates again.">
                    Where's My Rhystic Study?
                </SectionTitle>
                <Paragraph>
                    Keeping track of shared staples in Commander is a headache.
                    You’re never sure which deck your Rhystic Study is in,
                    you’ve bought extras just to stay legal, and proxies are
                    piling up fast. It’s chaotic, expensive, and all too common.
                </Paragraph>
            </div>
        </Section>
    );
};

export default Problem;
