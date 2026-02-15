'use client';

import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { Field, FieldContent, FieldError, FieldLabel } from '@/shared/components/ui/field';
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { useLocale } from 'next-intl';

interface SelectCountryProps<TFormValues extends FieldValues> {
  form: UseFormReturn<TFormValues>;
  name: Path<TFormValues>;
  children: React.ReactNode;
}

export const SelectForm = <TFormValues extends FieldValues>({ form, name, children }: SelectCountryProps<TFormValues>) => {
  const locale = useLocale();

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-2">
          <FieldContent>
            <FieldLabel htmlFor={name} className="text-sm font-semibold text-black">
              البلد
            </FieldLabel>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </FieldContent>

          <Select dir={locale === 'ar' ? 'rtl' : 'ltr'} name={field.name} value={field.value as string} onValueChange={field.onChange}>
            <SelectTrigger id={name} aria-invalid={fieldState.invalid} className="bg-Background border-Stroke min-w-30 rounded-sm border">
              <SelectValue placeholder="Select" />
            </SelectTrigger>

            <SelectContent position="item-aligned" className="bg-Background border-Stroke rounded-sm border">
              {children}
            </SelectContent>
          </Select>
        </Field>
      )}
    />
  );
};
