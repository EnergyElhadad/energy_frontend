import React from "react";

type InputFilterProps = {
  name?: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
};

export const InputFilter: React.FC<InputFilterProps> = ({
  label,
  name,
  value,
  onChange,
}) => {
  return (
    <div>
      {label || name ? (
        <label
          htmlFor={name}
          className="mb-2 block w-fit text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      ) : null}
      <input
        id={name}
        type="number"
        value={value}
        onChange={onChange}
        className="focus:ring-primary w-full rounded-sm border border-[#eeeeee] px-3 py-2 focus:border-none focus:ring-2 focus:outline-none"
      />
    </div>
  );
};
