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
            <div className="flex">
                <button className="w-1/2 flex border-t border-solid border-slate-600 justify-center items-center p-4 border-r">details</button>
                <button className="w-1/2 border-t border-solid border-slate-600 justify-center items-center flex p-4">edit</button>
            </div>
        </div>
    )
}

export default DeckTile;
