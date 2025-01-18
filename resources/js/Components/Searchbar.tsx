import { scryfallAutoComplete, scryfallSearch } from '@/api/Scryfall';
import { useEffect, useState } from 'react';

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
            className="relative mb-10 w-full"
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmitSearch(search);
            }}
        >
            {/* <label htmlFor="search" className="sr-only"> */}
            <label htmlFor="cardSearch">card search</label>

            <input className={'btn btn-primary'} type="submit" value="Submit" />

            <input
                id="cardSearch"
                type="text"
                className="w-full rounded-lg border border-gray-300 p-2"
                placeholder="Search for a card"
                min={3}
                max={100}
                value={search}
                onChange={(e) => handleSearchOnChange(e.target.value)}
                autoFocus={autofocus}
            />
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
