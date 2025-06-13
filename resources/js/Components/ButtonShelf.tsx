import { debounce } from '@/utilities/general';
import { useEffect, useRef, useState } from 'react';
import PrimaryButton from './PrimaryButton';

type Button = {
    label: string;
    action?: () => void;
    link?: string;
};

type ButtonShelfProps = {
    buttons: Button[];
};

const ButtonShelf = ({ buttons }: ButtonShelfProps) => {
    const [fixShelf, setFixShelf] = useState(false);
    const buttonShelfRef = useRef<HTMLDivElement>(null);

    const handleScrollPast = (isIntersecting: boolean) => {
        setFixShelf(!isIntersecting);
    };

    const debouncedHandleScrollPast = debounce(handleScrollPast, 100);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                debouncedHandleScrollPast(entry.isIntersecting);
            },
            {
                root: null, // Use the viewport as the root
                threshold: 0, // Trigger when the element is fully out of view
            },
        );

        if (buttonShelfRef.current) {
            observer.observe(buttonShelfRef.current);
        }

        return () => {
            if (buttonShelfRef.current) {
                observer.unobserve(buttonShelfRef.current);
            }
        };
    }, [debouncedHandleScrollPast]);

    if (!buttons.length) {
        return null;
    }

    const keyedButtons = buttons.map((button) => ({
        ...button,
        key: `${crypto.randomUUID()}`,
    }));

    // Determine the number of columns based on the number of buttons
    const gridColsClass =
        buttons.length <= 4 ? `grid-cols-${buttons.length}` : 'grid-cols-4';

    return (
        <>
            <div ref={buttonShelfRef} className="bookmark h-px w-full"></div>
            <div
                className={`buttonShelfWrapper flex w-full justify-center transition-transform duration-350 ${fixShelf ? 'fixed -top-[100px] left-0 z-50 translate-y-[100px] bg-black py-4' : 'relative'}`}
            >
                <div className={`container grid ${gridColsClass} gap-1`}>
                    {keyedButtons.map((button) => (
                        <PrimaryButton
                            key={`${button.key}`}
                            className={`btn col-span-2 md:col-span-1`}
                            aria-label={button.label}
                            onClick={button.action ?? button.action}
                            format={button.link ? 'link' : 'button'}
                            href={button.link ?? button.link}
                        >
                            {button.label}
                        </PrimaryButton>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ButtonShelf;
