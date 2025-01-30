type DeckTileProps = {
 title: string;
};
const DeckTile = ({title}:DeckTileProps) => {
    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title">
                    {title}
                </h4>
            </div>
        </div>
    )
}

export default DeckTile;
