'use client';

import { Search } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { useSearchAutocomplete } from '@/features/products/hooks/useSearchAutocomplete';

interface SearchFilterProps {
  value: string;
  handleSearchChange: (query: string) => void;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({ value, handleSearchChange }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { query, setQuery, setQueryExternal, results, isOpen, setIsOpen, onSelection } = useSearchAutocomplete(value);

  // Sync local hook state with parent prop when prop changes
  useEffect(() => {
    if (value !== query) {
      setQueryExternal(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

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

  const handleSelection = (selectedName: string) => {
    onSelection(selectedName);
    handleSearchChange(selectedName);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setQuery(newVal);
    handleSearchChange(newVal);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="group border-signalGray hover:border-primary focus-within:border-primary flex h-10 items-center rounded-lg border px-3 py-2 transition-colors">
        <Search className="text-signalGray group-focus-within:text-primary me-3 h-5 w-5 shrink-0 transition-colors" />

        <input
          type="text"
          placeholder="ابحث عن منتج"
          value={query}
          onChange={handleChange}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
          onBlur={e => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.relatedTarget as Node)) {
              setIsOpen(false);
            }
          }}
          className="caret-primary text-signalGray placeholder-signalGray flex-1 bg-transparent text-right text-sm outline-none"
        />
      </div>

      {isOpen && results.length > 0 && (
        <div className="border-Stroke absolute top-[calc(100%+5px)] left-0 z-50 max-h-[300px] w-full overflow-y-auto rounded-[8px] border bg-white shadow-lg">
          {results.map(item => (
            <button
              key={item.id}
              className="text-primary w-full px-[18px] py-[10px] text-start text-sm transition-colors hover:bg-gray-50"
              onClick={() => handleSelection(item.name)}
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
