import { useState, useRef, useEffect } from 'react';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { getAutocomplete } from '@/features/products/services/getAutocomplete';
import { AutocompleteItem } from '@/features/products/types/autocompleteResponse';

export const useSearchAutocomplete = (initialQuery = '') => {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<AutocompleteItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const blockFetchRef = useRef(false);
  // Ref to control if the dropdown should automatically open after a fetch
  const shouldOpenRef = useRef(false);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const fetchAutocomplete = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      if (blockFetchRef.current) {
        blockFetchRef.current = false;
        return;
      }

      try {
        const data = await getAutocomplete(debouncedQuery);
        setResults(data);
        if (data.length > 0 && shouldOpenRef.current) {
          setIsOpen(true);
        } else {
          // If no results, always close.
          // If we have results but shouldOpenRef is false, we keep the current isOpen state (likely false).
          if (data.length === 0) setIsOpen(false);
        }
        // Reset shouldOpenRef after processing the fetch result
        shouldOpenRef.current = false;
      } catch (error) {
        console.error('Failed to fetch autocomplete', error);
        setResults([]);
      }
    };

    fetchAutocomplete();
  }, [debouncedQuery]);

  const onQueryChange = (newQuery: string) => {
    setQuery(newQuery);
    blockFetchRef.current = false;
    shouldOpenRef.current = true; // User typing -> should open
  };

  const onExternalUpdate = (newQuery: string) => {
    setQuery(newQuery);
    blockFetchRef.current = false; // We allow fetch to keep results fresh
    shouldOpenRef.current = false; // External update -> should NOT open automatically
  };

  const onSelection = (value: string) => {
    blockFetchRef.current = true;
    setQuery(value);
    setIsOpen(false);
    shouldOpenRef.current = false;
  };

  return {
    query,
    setQuery: onQueryChange, // Default setter (assumes user interaction)
    setQueryExternal: onExternalUpdate, // Setter for syncing/external updates
    results,
    isOpen,
    setIsOpen,
    onSelection,
  };
};
