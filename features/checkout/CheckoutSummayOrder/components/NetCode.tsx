import React from 'react';

export const NetCode = ({
  label,
  placeholder,
  buttonTitle,
  onClick,
  value,
  disabled,
  onChange,
  isLoading,
}: {
  label: string;
  placeholder: string;
  buttonTitle: string;
  onClick: () => void;
  value: string;
  disabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
}) => {
  return (
    <>
      <label htmlFor="netCode" className="text-gray600 mb-2 text-sm font-semibold">
        {label}
      </label>
      <div className="mt-2 flex h-11.75 gap-2 bg-white">
        <input
          type="text"
          id="netCode"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={isLoading || disabled}
          className="border-gray100 focus:border-primary w-full rounded-sm border border-e-transparent px-3 py-2.5 transition focus:border-e-transparent focus:outline-none"
        />
        <button
          onClick={onClick}
          disabled={isLoading || disabled}
          className="border-primary bg-primary hover:text-primary min-w-fit rounded-sm border px-4 py-2.5 text-white transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? '...' : buttonTitle}
        </button>
      </div>
    </>
  );
};
