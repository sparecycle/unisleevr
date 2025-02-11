import { useEffect, useRef, useState } from 'react';
import { debounce } from '../utility';

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

    // Determine the number of columns based on the number of buttons
    const gridColsClass =
        buttons.length <= 4 ? `grid-cols-${buttons.length}` : 'grid-cols-4';

    return (
        <>
            <div ref={buttonShelfRef} className="bookmark h-[1px] w-full"></div>
            <div
                className={`buttonShelfWrapper duration-350 flex w-full justify-center transition-transform ${fixShelf ? 'fixed -top-[100px] left-0 translate-y-[100px]' : 'relative'} z-50 mb-4`}
            >
                <div className={`container grid ${gridColsClass} gap-1`}>
                    {buttons.map((button, index) => (
                        <>
                            {button.link ? (
                                <a
                                    key={`${index}-${button.label}`}
                                    href={button.link}
                                    className={`col-span-2 rounded bg-blue-500 px-4 py-2 text-center font-bold text-white hover:bg-blue-700 md:col-span-1`}
                                    aria-label={button.label}
                                >
                                    {button.label}
                                </a>
                            ) : (
                                <button
                                    key={`${index}-${button.label}`}
                                    className={`col-span-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 md:col-span-1`}
                                    aria-label={button.label}
                                    onClick={button.action}
                                >
                                    {button.label}
                                </button>
                            )}
                        </>
                    ))}
                </div>
                {/* <div className="container flex flex-wrap gap-1">
                    {buttons.map((button, index) => (
                        <button
                            key={`${index}-${button.label}`}
                            className="max-w-[25%] flex-grow basis-1/4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                            aria-label={button.label}
                            onClick={button.action}
                        >
                            {button.label}
                        </button>
                    ))}
                </div> */}
                {/* <div className="container flex flex-wrap gap-1">
                    {buttons.map((button, index) => (
                        <button
                            key={`${index}-${button.label}`}
                            className="max-w-[calc(25%-0.25rem)] flex-grow basis-[calc(25%-0.25rem)] rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                            aria-label={button.label}
                            onClick={button.action}
                        >
                            {button.label}
                        </button>
                    ))}
                </div> */}
            </div>
        </>
    );
};

export default ButtonShelf;
