import { scryfallAutoComplete, scryfallSearch } from '@/api/Scryfall';
import { useEffect, useState } from 'react';
import { ImSearch } from 'react-icons/im';

type SearchbarProps = {
    autofocus: boolean;
    parentSetter: (value: any) => void;
};

const Searchbar = ({ autofocus, parentSetter }: SearchbarProps) => {
    const [search, setSearch] = useState('');
    const [autoCompleteResults, setAutoCompleteResults] = useState<string[]>(
        [],
    );
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);

    const validateSearch = (search: string) => {
        if (search.length < 3) {
            setError('Search must be at least 3 characters');
            throw new Error(error);
            return false;
        } else if (search.length > 100) {
            setError('Search must be less than 100 characters');
            throw new Error(error);
            return false;
        } else {
            setError(undefined);
        }

        return true;
    };

    const handleSearchOnChange = async (searchQuery: string) => {
        setLoading(true);
        setSearch(searchQuery);
        if (!validateSearch(searchQuery)) {
            setLoading(false);
            throw new Error(error);
        }
        try {
            const data = await scryfallAutoComplete(search);
            setLoading(false);
            setAutoCompleteResults(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitSearch = async (searchQuery: string) => {
        setLoading(true);
        try {
            setSearch(searchQuery);
            const data = await scryfallSearch(search);
            setResults(data);
            setAutoCompleteResults([]);
            parentSetter(results);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAutoCompleteResultClick = async (searchQuery: string) => {
        setLoading(true);

        try {
            handleSubmitSearch(searchQuery);
            // setAutoCompleteResults([]);
            setLoading(false);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (search.length === 0) {
            setAutoCompleteResults([]);
            setResults([]);
            setError(undefined);
            setLoading(false);
        }
        if (search.length < 3 || error) {
            setAutoCompleteResults([]);
            setResults([]);
        }
        if (!error) {
            setError(undefined);
        }
    }, [search]);

    return (
        <form
            className="relative mx-auto max-w-md"
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmitSearch(search);
            }}
        >
            {/* <label htmlFor="search" className="sr-only"> */}
            <label htmlFor="cardSearch" className="sr-only">
                card search
            </label>

            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                    <ImSearch />
                </div>
                <input
                    type="search"
                    id="default-search"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Search for a card"
                    min={3}
                    max={100}
                    value={search}
                    onChange={(e) => handleSearchOnChange(e.target.value)}
                    autoFocus={autofocus}
                />
                <button
                    type="submit"
                    className="absolute bottom-2.5 end-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Search
                </button>
            </div>

            <div
                className={`autocomplete-results ${autoCompleteResults.length > 0 ? 'block' : 'hidden'}`}
            >
                <ul className="absolute w-full rounded-lg border border-gray-300 bg-white">
                    {autoCompleteResults.map(
                        (result: string, index: number) => (
                            <li
                                className={
                                    'cursor-pointer hover:bg-gray-200 hover:text-gray-800'
                                }
                                key={`autoCompleteResults-${index}`}
                                onClick={() =>
                                    handleAutoCompleteResultClick(result)
                                }
                            >
                                {result}
                            </li>
                        ),
                    )}
                </ul>
            </div>
            {error && (
                <div>
                    <span>{error}</span>
                </div>
            )}
            {loading && <div>Loading results...</div>}
        </form>
    );
};

export default Searchbar;
