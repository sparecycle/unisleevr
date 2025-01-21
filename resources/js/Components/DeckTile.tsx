type DeckTileProps = {
 title: string;
};
const DeckTile = ({title}:DeckTileProps) => {
    return (
        <div className="border flex flex-col rounded-md border-solid border-slate-600">
            <div className="p-4  gap-4">
                <h4 className="text-md">
                    {title}
                </h4>
            </div>
            <button className="flex border-t border-solid border-slate-600 justify-center items-center p-4">details</button>
        </div>
    )
}

export default DeckTile;
