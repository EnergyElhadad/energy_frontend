"use client";

import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/shared/components/ui/input-group";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";

interface InputProps<TFormValues extends FieldValues> {
  form: UseFormReturn<TFormValues>;
  name: Path<TFormValues>;
  label: string;
  textarea?: boolean;
}

export const InputForm = <TFormValues extends FieldValues>({
  form,
  name,
  label,
  textarea,
}: InputProps<TFormValues>) => {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-2">
          <FieldLabel
            htmlFor={name}
            className="text-sm font-semibold text-black"
          >
            {label}
          </FieldLabel>
          {textarea ? (
            <InputGroup>
              <InputGroupTextarea
                {...field}
                id="description"
                placeholder=""
                rows={6}
                className="bg-Background border-Stroke min-h-24 resize-none rounded-sm border"
                aria-invalid={fieldState.invalid}
              />
            </InputGroup>
          ) : (
            <Input
              {...field}
              id={name}
              className="bg-Background border-Stroke rounded-sm border"
              aria-invalid={fieldState.invalid}
              placeholder=""
              autoComplete="off"
            />
          )}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
