import TextInput from '@/Components/TextInput';
import Section from '@/Components/Unauthenticated/Section';
import SectionTitle from '@/Components/Unauthenticated/SectionTitle';

const BottomCta = () => {
    return (
        <Section>
            <SectionTitle>Hold Priority</SectionTitle>
            <p>
                Get the latest news. Join our founding playgroup. Get early
                access.
            </p>
            <form className="flex w-full flex-col items-stretch gap-x-2 gap-y-4">
                <TextInput type="email" placeholder="Your Email" />
                <button className="font-title rounded-md bg-rose-600 px-4 py-1.5 text-lg font-medium uppercase">
                    Join the Waitlist
                </button>
            </form>
        </Section>
    );
};

export default BottomCta;
