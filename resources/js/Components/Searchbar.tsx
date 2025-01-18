import { scryfallAutoComplete, scryfallSearch } from '@/api/Scryfall';
import { useEffect, useState } from 'react';

type SearchbarProps = {
    autofocus: boolean;
};

const Searchbar = ({ autofocus }: SearchbarProps) => {
    const [search, setSearch] = useState('');
    const [autoCompleteResults, setAutoCompleteResults] = useState<any>([]);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);

    console.log(scryfallSearch('omnath'), autofocus);

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

    const handleSearch = async (search: string) => {
        setLoading(true);
        setSearch(search);
        if (!validateSearch(search)) {
            setLoading(false);
            throw new Error(error);
            return;
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

    const handleAutoCompleteResultClick = async (searchQuery: string) => {
        setLoading(true);
        setSearch(searchQuery);
        try {
            const data = await scryfallSearch(searchQuery);
            setLoading(false);
            setResults(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }


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
        <div className="relative mb-10 w-full">
            {/* <label htmlFor="search" className="sr-only"> */}
            <label htmlFor="cardSearch">card search</label>
            <input
                id="cardSearch"
                type="text"
                className="w-full rounded-lg border border-gray-300 p-2"
                placeholder="Search for a card"
                min={3}
                max={100}
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
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
                                onClick={() => setSearch(result)}
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
            <button>Search</button>
            
            {/* <div className="search-results">
                {results.map((result) => (
                    <div key={result.id}>
                        <h3>{result.name}</h3>
                        <p>{result.oracle_text}</p>
                    </div>
                ))}
            </div> */}
        </div>
    );
};

export default Searchbar;
