import {
    scryfallAutoComplete,
    scryfallNamedSearch,
    scryfallSearch,
} from '@/api/Scryfall';
import { CardDataType, mtgColorStrings } from '@/types/mtg';
import { debounce, useOutsideAlerter } from '@/utilities/general';
import { prepCardDataForRender } from '@/utilities/prepCardData';
import { useEffect, useRef, useState } from 'react';
import { ImSearch } from 'react-icons/im';

type SearchbarProps = {
    autofocus: boolean;
    parentSetter: (value: CardDataType[]) => void;
    specificCard?: boolean | undefined;
    placeholderText?: string;
    CTAText?: string;
    cardsToExclude?: CardDataType[];
    colors?: mtgColorStrings[];
};

const Searchbar = ({
    autofocus,
    parentSetter,
    specificCard,
    placeholderText,
    CTAText,
    cardsToExclude,
    colors,
}: SearchbarProps) => {
    const [userSearchInput, setUserSearchInput] = useState('');
    const [autoCompleteResults, setAutoCompleteResults] = useState<string[]>(
        [],
    );
    const [autoCompleteResultsFiltered, setAutoCompleteResultsFiltered] =
        useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [highlightedIndex, setHighlightedIndex] = useState<number | null>(
        null,
    );

    const searchWrapperRef = useRef(null);
    const listRef = useRef<HTMLUListElement | null>(null);

    const handleOutsideClick = () => {
        resetSearch();
    };

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(undefined), 3000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const resetSearch = () => {
        setUserSearchInput('');
        setAutoCompleteResults([]);
        setHighlightedIndex(null);
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
            console.error('Search query is invalid', searchQuery);
            throw new Error(error);
        }
        debouncedFetchAutoComplete(searchQuery);
    };

    useEffect(() => {
        if (cardsToExclude !== undefined && colors !== undefined) {
            const namedResultsPromises = autoCompleteResults.map(
                async (result) => await scryfallNamedSearch(result),
            );
            Promise.all(namedResultsPromises)
                .then((resolvedResults) => {
                    const colorFilteredResults: string[] = [];
                    resolvedResults.forEach((result) => {
                        if (
                            result.color_identity.every(
                                (color: mtgColorStrings) =>
                                    colors.includes(color),
                            )
                        ) {
                            colorFilteredResults.push(result.name);
                        }
                    });
                    setAutoCompleteResultsFiltered(colorFilteredResults);
                })
                .catch((error) => {
                    console.error('Error fetching card data:', error);
                });
        } else {
            setAutoCompleteResultsFiltered(autoCompleteResults);
        }
    }, [autoCompleteResults]);

    const debouncedFetchAutoComplete = debounce(async (searchQuery: string) => {
        try {
            const data = await scryfallAutoComplete(searchQuery);
            const filteredData = data.filter(async (result: string) => {
                return !cardsToExclude?.some((card) => card.name === result);
            });
            setAutoCompleteResults(filteredData);
            setError(undefined);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, 100);

    const handleSubmitSearch = async (searchQuery: string) => {
        setLoading(true);
        try {
            setUserSearchInput(searchQuery);
            const data = specificCard
                ? await scryfallNamedSearch(searchQuery)
                : await scryfallSearch(searchQuery);
            const output: CardDataType[] = await prepCardDataForRender([data]);
            console.log('output', output);
            resetSearch();
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
            await handleSubmitSearch(searchQuery);
            setLoading(false);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const scrollToHighlightedIndex = (index: number | null) => {
        if (listRef.current && index !== null) {
            const listItem = listRef.current.children[index] as HTMLElement;
            if (listItem) {
                listItem.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                });
            }
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
                    className={`block w-full ${autoCompleteResults.length > 0 || error || loading ? 'rounded-t-lg' : 'rounded-lg'} border border-zinc-300 bg-zinc-50 p-4 ps-10 text-sm text-zinc-900 focus:border-zinc-500 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white dark:placeholder-zinc-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                    placeholder={placeholderText ?? `Search for a card`}
                    min={3}
                    max={100}
                    value={userSearchInput}
                    onChange={(e) => handleSearchOnChange(e.target.value)}
                    onKeyDown={(e) => {
                        let newIndex = highlightedIndex;
                        switch (e.key) {
                            case 'Enter':
                                e.preventDefault();

                                setUserSearchInput(
                                    autoCompleteResults[highlightedIndex ?? 0],
                                );
                                !highlightedIndex
                                    ? setHighlightedIndex(0)
                                    : setHighlightedIndex(null);

                                handleSubmitSearch(
                                    !highlightedIndex
                                        ? userSearchInput
                                        : autoCompleteResults[highlightedIndex],
                                );
                                break;
                            case 'Escape':
                                setUserSearchInput('');
                                setAutoCompleteResults([]);
                                break;
                            case 'ArrowUp':
                                e.preventDefault();
                                if (highlightedIndex !== null) {
                                    newIndex =
                                        highlightedIndex > 0
                                            ? highlightedIndex - 1
                                            : autoCompleteResults.length - 1;
                                    setHighlightedIndex(newIndex);
                                    scrollToHighlightedIndex(newIndex);
                                }
                                break;
                            case 'ArrowDown':
                                e.preventDefault();
                                newIndex =
                                    highlightedIndex !== null &&
                                    highlightedIndex <
                                        autoCompleteResults.length - 1
                                        ? highlightedIndex + 1
                                        : 0;
                                setHighlightedIndex(newIndex);
                                scrollToHighlightedIndex(newIndex);
                                break;
                            case 'Tab':
                                if (autoCompleteResults.length > 0) {
                                    e.preventDefault();

                                    setUserSearchInput(
                                        autoCompleteResults[
                                            highlightedIndex ?? 0
                                        ],
                                    );
                                    !highlightedIndex
                                        ? setHighlightedIndex(0)
                                        : setHighlightedIndex(null);
                                }
                                break;
                            default:
                                break;
                        }
                    }}
                    autoFocus={autofocus}
                    autoComplete="off"
                />
                <button
                    type="submit"
                    className="absolute bottom-2.5 end-2.5 rounded-lg bg-zinc-700 px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-800 focus:outline-none focus:ring-4 focus:ring-zinc-200 dark:bg-zinc-300 dark:hover:bg-zinc-400 dark:focus:ring-zinc-500"
                >
                    {CTAText ?? `Search`}
                </button>
            </div>

            <div
                className={`autocomplete-results absolute left-0 right-0 top-full z-50 max-h-[80px] overflow-scroll rounded-b-lg border border-zinc-300 dark:border-zinc-600 ${
                    autoCompleteResults.length > 0 || error || loading
                        ? 'block'
                        : 'hidden'
                }`}
            >
                <ul
                    ref={listRef}
                    className="autocomplete-results-list z-99 relative w-auto rounded-b-lg bg-zinc-800"
                    tabIndex={0}
                >
                    <div className="sticky top-0 z-10 h-1 py-2 shadow-[inset_0_4px_6px_rgba(0,0,0,0.5)]"></div>
                    {loading && <li>Loading results...</li>}
                    {error && (
                        <li className="text-center text-red-500">
                            <span>{error}</span>
                        </li>
                    )}

                    {autoCompleteResultsFiltered.map(
                        (result: string, index: number) => (
                            <li
                                className={`cursor-pointer px-2 ${
                                    highlightedIndex === index
                                        ? 'bg-zinc-200 text-zinc-800'
                                        : 'hover:bg-zinc-400 hover:text-zinc-800'
                                }`}
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
        </form>
    );
};

export default Searchbar;
