import Section from '@/Components/Unauthenticated/Section';
import SectionTitle from '@/Components/Unauthenticated/SectionTitle';
import TitleText from '@/Components/Unauthenticated/TitleText';

const UseCase = () => {
    return (
        <Section>
            <SectionTitle eyebrow="For new and experienced players alike">
                Brew Without Limits
            </SectionTitle>
            <div>
                <strong>New commander idea? Go wild.</strong>
                <p>
                    Our app lets you brew dozens of decks without costing you an
                    arm and a leg. Build first, reconcile later.
                </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-y-2">
                <div className="flex w-full items-center justify-start">
                    <TitleText
                        title={'Streamline Your Buylist'}
                        text={
                            'See what you actually need to buy — and what you already own across decks.'
                        }
                        className="items-start !text-left"
                    />
                </div>
                <div className="flex w-full items-center justify-start">
                    <TitleText
                        title={'Brew Variants with Ease'}
                        text={
                            'Build multiple takes on the same commander or archetype without duplicating effort — or cards.'
                        }
                        className="items-start !text-left"
                    />
                </div>
                <div className="flex w-full items-center justify-start">
                    <TitleText
                        title={'See What’s Recyclable'}
                        text={
                            'Find cards that are underused or used in just one deck — and reassign them to new builds.'
                        }
                        className="items-start !text-left"
                    />
                </div>
                <div className="flex w-full items-center justify-start">
                    <TitleText
                        title={'Check Your Power Level'}
                        text={'Get a Rule-0 snapshot of your deck.'}
                        className="items-start !text-left"
                    />
                </div>
            </div>
        </Section>
    );
};

export default UseCase;
