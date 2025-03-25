import { MdAdd } from 'react-icons/md';

type DeckTileButtonFaceProps = {
    title: string;
    buttonAction?: () => void;
};

const DeckTileButtonFace = ({
    title,
    buttonAction,
}: DeckTileButtonFaceProps) => {
    return (
        <button onClick={buttonAction}>
            <div className="deck-tile-header flex h-2/3 w-full items-center justify-center rounded-md">
                <MdAdd size={'auto'} />
            </div>
            <div className="deck-tile-body flex h-1/3 w-full items-center justify-center">
                <h4 className="deck-tile-title hyphen-manual w-full text-wrap px-2 text-center font-bold">
                    {title}
                </h4>
            </div>
        </button>
    );
};

export default DeckTileButtonFace;
