import React from 'react';

interface NetCodeProps {
  label: string;
  placeholder: string;
  buttonTitle: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  disabled?: boolean;
}

export const NetCode = ({ label, placeholder, buttonTitle, value, onChange, onClick, disabled }: NetCodeProps) => {
  return (
    <div>
      <label htmlFor="netCode" className="mb-2">
        {label}
      </label>
      <div className="mt-2 flex h-11.75">
        <input
          type="text"
          id="netCode"
          placeholder={placeholder}
          className="border-gray100 focus:border-primary w-full rounded-sm border border-e-transparent px-3 py-2.5 transition focus:border-e-transparent focus:outline-none disabled:bg-gray-100 disabled:text-gray-500"
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
        <button
          onClick={onClick}
          disabled={disabled}
          className="border-primary text-primary hover:bg-primary caret-primary min-w-fit rounded-sm border px-4 py-2.5 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {buttonTitle}
        </button>
      </div>
    </div>
  );
};
