import { TbCardsFilled } from 'react-icons/tb';

type DeckTileProps = {
    title: string;
};
const DeckTile = ({ title }: DeckTileProps) => {
    return (
        <button className="card btn bg-lg flex aspect-[2.5/3] flex-col rounded-md border border-solid border-zinc-600 bg-zinc-200 hover:bg-zinc-300 focus:bg-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-zinc-400 dark:bg-zinc-950 dark:hover:bg-zinc-900 dark:focus:bg-zinc-900 dark:active:bg-zinc-800">
            <div className="card-header flex h-2/3 w-full items-center justify-center rounded-md">
                <TbCardsFilled size={175} />
            </div>
            <div className="card-body flex h-1/3 w-full items-center justify-center">
                <h4 className="card-title hyphen-manual w-full text-wrap px-2 text-center font-bold">
                    {title}
                </h4>
            </div>
        </button>
    );
};

export default DeckTile;
