'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { SearchIcon } from '@/shared/components/icons/Search';
import { useSearchAutocomplete } from '@/features/products/hooks/useSearchAutocomplete';

export const Search = () => {
  const t = useTranslations('Header');
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { query, setQuery, setQueryExternal, results, isOpen, setIsOpen, onSelection } = useSearchAutocomplete(initialSearch);

  // Sync with URL changes
  useEffect(() => {
    const searchParam = searchParams.get('search') || '';
    if (searchParam !== query) {
      setQueryExternal(searchParam);
    }
    // We only want to sync when searchParams changes, and we typically want to avoid
    // overriding user typing if they are typing faster than navigation (though nav usually waits).
    // To be safe and avoid loops, we use the check above.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsOpen]);

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setIsOpen(false);
    router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    }
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-[583px]">
      <div className="border-Stroke focus-within:border-primary hidden h-[40px] w-full items-center gap-[10px] rounded-[8px] border px-[18px] py-[11px] sm:flex">
        <button onClick={() => handleSearch(query)} type="button">
          <SearchIcon />
        </button>
        <input
          className="placeholder:text-signalGray h-full w-full bg-transparent outline-none"
          type="text"
          placeholder={t('search_placeholder')}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
          onBlur={e => {
            // Only close if focus moves outside the component (e.g. tabbing away)
            // If clicking a result item, that item is inside wrapperRef, so we don't close here
            if (wrapperRef.current && !wrapperRef.current.contains(e.relatedTarget as Node)) {
              setIsOpen(false);
            }
          }}
        />
      </div>

      {isOpen && results.length > 0 && (
        <div className="border-Stroke absolute top-[calc(100%+5px)] left-0 z-50 max-h-[300px] w-full overflow-y-auto rounded-[8px] border bg-white shadow-lg">
          {results.map(item => (
            <button
              key={item.id}
              className="text-primary w-full px-[18px] py-[10px] text-start text-sm transition-colors hover:bg-gray-50"
              onClick={() => {
                onSelection(item.name);
                handleSearch(item.name);
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
