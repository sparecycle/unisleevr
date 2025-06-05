import { mtgColors } from '@/constants';
import { mtgColorStrings } from '@/types/mtg';

export const ColorDivider = ({
    colorIdentity,
}: {
    colorIdentity: mtgColorStrings[];
}) => {
    return (
        <div className="color-divider flex h-[3px] w-full">
            {colorIdentity?.map((color: mtgColorStrings) => (
                <div
                    key={`deck-color-${color}`}
                    style={{
                        backgroundColor:
                            mtgColors.hex[color as keyof typeof mtgColors.hex],
                    }}
                    className="h-full w-full"
                ></div>
            ))}
        </div>
    );
};
