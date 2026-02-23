'use client';

import { useEffect, useRef, useState } from 'react';
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
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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
    <div ref={wrapperRef} className="relative w-full lg:max-w-[583px]">
      {/* Desktop Search Input */}
      <div className="border-Stroke focus-within:border-primary hidden h-[40px] w-full items-center gap-[10px] rounded-[8px] border px-[18px] py-[11px] lg:flex">
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
            if (wrapperRef.current && !wrapperRef.current.contains(e.relatedTarget as Node)) {
              setIsOpen(false);
            }
          }}
        />
      </div>

      {/* Mobile Search Trigger */}
      <button type="button" className="flex items-center justify-center p-2 text-gray-700 lg:hidden" onClick={() => setIsMobileOpen(true)}>
        <SearchIcon className="h-6 w-6" />
      </button>

      {/* Mobile Search Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-100 flex flex-col bg-white p-4 lg:hidden">
          <div className="mb-4 flex items-center gap-2">
            <div className="border-Stroke focus-within:border-primary flex h-[45px] flex-1 items-center gap-[10px] rounded-[8px] border bg-gray-50 px-[15px]">
              <button
                onClick={() => {
                  handleSearch(query);
                  setIsMobileOpen(false);
                }}
                type="button"
              >
                <SearchIcon />
              </button>
              <input
                autoFocus
                className="placeholder:text-signalGray h-full w-full bg-transparent text-base outline-none"
                type="text"
                placeholder={t('search_placeholder')}
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    handleSearch(query);
                    setIsMobileOpen(false);
                  }
                }}
              />
            </div>
            <button type="button" className="p-2 text-sm font-medium text-gray-600" onClick={() => setIsMobileOpen(false)}>
              {t('cancel')}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {results.length > 0 ? (
              results.map(item => (
                <button
                  key={item.id}
                  className="text-primary w-full border-b border-gray-100 px-2 py-4 text-start font-medium transition-colors hover:bg-gray-50"
                  onClick={() => {
                    onSelection(item.name);
                    handleSearch(item.name);
                    setIsMobileOpen(false);
                  }}
                >
                  {item.name}
                </button>
              ))
            ) : query.length > 0 ? (
              <p className="py-8 text-center text-gray-500">{t('no_results')}</p>
            ) : null}
          </div>
        </div>
      )}

      {/* Desktop Search Results Dropdown */}
      {isOpen && results.length > 0 && !isMobileOpen && (
        <div className="border-Stroke absolute top-[calc(100%+5px)] left-0 z-50 hidden max-h-[300px] w-full overflow-y-auto rounded-[8px] border bg-white shadow-lg lg:block">
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
