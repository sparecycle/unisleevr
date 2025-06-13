type Props = {
    title: string;
    text: string;
    className?: string;
};
const TitleText = ({ title, text, className }: Props) => {
    return (
        <div
            className={`flex flex-col items-center justify-start gap-y-1.5 p-3 text-center ${className && className}`}
        >
            <h3 className="font-title text-lg leading-tight font-semibold">
                {title}
            </h3>
            <p className="text-sm">{text}</p>
        </div>
    );
};

export default TitleText;
