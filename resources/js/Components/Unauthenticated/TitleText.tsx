type Props = {
    title: string;
    text: string;
    className?: string;
};
const TitleText = ({ title, text, className }: Props) => {
    return (
        <div
            className={`flex grow flex-col items-center justify-start gap-y-1.5 border-b border-solid border-rose-500 py-6 text-center ${className && className}`}
        >
            <h3 className="font-title text-lg leading-tight font-semibold">
                {title}
            </h3>
            <p className="text-sm leading-6">{text}</p>
        </div>
    );
};

export default TitleText;
