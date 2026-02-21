import React from 'react';
import { InputFilter } from './components/InputFilter';

interface DisplayPriceProps {
  fromValue: number;
  toValue: number;
  onChangeFrom: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeTo: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
}

export const DisplayPrice = ({ fromValue, toValue, onChangeFrom, onChangeTo, min, max }: DisplayPriceProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <InputFilter value={fromValue} onChange={onChangeFrom} label="من" name="from" min={min} max={max} />
      <InputFilter value={toValue} onChange={onChangeTo} label="إلي" name="to" min={min} max={max} />
    </div>
  );
};
