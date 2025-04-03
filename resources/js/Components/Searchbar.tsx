import {
    scryfallAutoComplete,
    scryfallNamedSearch,
    scryfallSearch,
} from '@/api/Scryfall';
import { CardDataType } from '@/types/mtg';
import { prepCardDataForRender, useOutsideAlerter } from '@/utility';
import { useRef, useState } from 'react';
import { ImSearch } from 'react-icons/im';

type SearchbarProps = {
    autofocus: boolean;
    parentSetter: (value: CardDataType[]) => void;
    specificCard?: boolean | undefined;
    placeholderText?: string;
    CTAText?: string;
};

const Searchbar = ({
    autofocus,
    parentSetter,
    specificCard,
    placeholderText,
    CTAText,
}: SearchbarProps) => {
    const [userSearchInput, setUserSearchInput] = useState('');
    const [autoCompleteResults, setAutoCompleteResults] = useState<string[]>(
        [],
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);

    const searchWrapperRef = useRef(null);
    const handleOutsideClick = () => {
        setAutoCompleteResults([]);
        setError(undefined);
    };
    useOutsideAlerter(searchWrapperRef, () => handleOutsideClick());

    const validateSearch = (userSearchInput: string) => {
        if (userSearchInput.length < 3) {
            setAutoCompleteResults([]);
            setError('Search must be at least 3 characters');
            return false;
        } else if (userSearchInput.length > 100) {
            setAutoCompleteResults([]);
            setError('Search must be less than 100 characters');
            return false;
        }

        setError(undefined);
        return true;
    };

    const handleSearchOnChange = async (searchQuery: string) => {
        setLoading(true);
        setUserSearchInput(searchQuery);
        if (!validateSearch(searchQuery)) {
            setLoading(false);
            throw new Error(error);
        }
        try {
            const data = await scryfallAutoComplete(userSearchInput);
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
            setUserSearchInput(searchQuery);
            const data = specificCard
                ? await scryfallNamedSearch(searchQuery)
                : await scryfallSearch(searchQuery);
            const output: CardDataType[] = await prepCardDataForRender([data]);
            setAutoCompleteResults([]);
            parentSetter(output);
        } catch (error) {
            console.error(error);
            setError('An error occurred while searching. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleAutoCompleteResultClick = async (searchQuery: string) => {
        setLoading(true);

        try {
            handleSubmitSearch(searchQuery);
            setAutoCompleteResults([]);
            setLoading(false);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            className="w-full"
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmitSearch(userSearchInput);
            }}
            ref={searchWrapperRef}
            onClick={() => {
                if (userSearchInput.length > 0) {
                    handleSearchOnChange(userSearchInput);
                }
            }}
        >
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
                    className="block w-full rounded-lg border border-zinc-300 bg-zinc-50 p-4 ps-10 text-sm text-zinc-900 focus:border-zinc-500 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white dark:placeholder-zinc-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder={placeholderText ?? `Search for a card`}
                    min={3}
                    max={100}
                    value={userSearchInput}
                    onChange={(e) => handleSearchOnChange(e.target.value)}
                    autoFocus={autofocus}
                    autoComplete="off"
                />
                <button
                    type="submit"
                    className="absolute bottom-2.5 end-2.5 rounded-lg bg-zinc-700 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 focus:outline-none focus:ring-4 focus:ring-zinc-200 dark:bg-zinc-300 dark:hover:bg-zinc-400 dark:focus:ring-zinc-500"
                >
                    {CTAText ?? `Search`}
                </button>
            </div>

            <div
                className={`autocomplete-results ${autoCompleteResults.length > 0 ? 'block' : 'hidden'}`}
                style={{ position: 'relative', zIndex: 10 }}
            >
                <ul
                    className="z-99 max-h-[20vh] w-auto overflow-y-auto rounded-lg border border-zinc-300 bg-zinc-700/90 py-2 dark:border-zinc-600"
                    tabIndex={0}
                >
                    {autoCompleteResults.map(
                        (result: string, index: number) => (
                            <li
                                className={
                                    'cursor-pointer px-2 hover:bg-zinc-200 hover:text-zinc-800'
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
