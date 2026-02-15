"use client";

import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/shared/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { useLocale } from "next-intl";

const countries = [
  { label: "مصر", value: "eg" },
  { label: "اسبانيا", value: "es" },
  { label: "فرنسا", value: "fr" },
  { label: "المانيا", value: "de" },
  { label: "ايطاليا", value: "it" },
  { label: "الصين", value: "zh" },
  { label: "اليابان", value: "ja" },
] as const;

interface SelectCountryProps<TFormValues extends FieldValues> {
  form: UseFormReturn<TFormValues>;
  name: Path<TFormValues>;
}

export const SelectCountry = <TFormValues extends FieldValues>({
  form,
  name,
}: SelectCountryProps<TFormValues>) => {
  const locale = useLocale();

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-2">
          <FieldContent>
            <FieldLabel
              htmlFor="country"
              className="text-sm font-semibold text-black"
            >
              البلد
            </FieldLabel>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </FieldContent>

          <Select
            dir={locale === "ar" ? "rtl" : "ltr"}
            name={field.name}
            value={field.value as string}
            onValueChange={field.onChange}
          >
            <SelectTrigger
              id="country"
              aria-invalid={fieldState.invalid}
              className="bg-Background border-Stroke min-w-30 rounded-sm border"
            >
              <SelectValue placeholder="Select" />
            </SelectTrigger>

            <SelectContent
              position="item-aligned"
              className="bg-Background border-Stroke rounded-sm border"
            >
              {countries.map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      )}
    />
  );
};
