import React from "react";
import { InputFilter } from "./components/InputFilter";

interface DisplayPriceProps {
  fromValue: number;
  toValue: number;
  onChangeFrom: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeTo: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DisplayPrice = ({
  fromValue,
  toValue,
  onChangeFrom,
  onChangeTo,
}: DisplayPriceProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <InputFilter
        value={fromValue}
        onChange={onChangeFrom}
        label="من"
        name="from"
      />
      <InputFilter
        value={toValue}
        onChange={onChangeTo}
        label="إلي"
        name="to"
      />
    </div>
  );
};
