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

const cities = [
  { label: "القاهرة", value: "ca" },
  { label: "المنصورة", value: "man" },
  { label: "طنطا", value: "ta" },
  { label: "الاسكندرية", value: "al" },
  { label: "اسوان", value: "asw" },
  { label: "اسيوط", value: "asu" },
  { label: "مرسي مطروح", value: "mar" },
] as const;

interface SelectCountryProps<TFormValues extends FieldValues> {
  form: UseFormReturn<TFormValues>;
  name: Path<TFormValues>;
}

export const SelectCity = <TFormValues extends FieldValues>({
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
              المدينة
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
              {cities.map((city) => (
                <SelectItem key={city.value} value={city.value}>
                  {city.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      )}
    />
  );
};
